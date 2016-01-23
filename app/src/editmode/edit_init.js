define(function(require){
    return{
        init: function(svg,force,getData,links){
            var delete_state = require("editmode/delete_state"),
                delete_references = require("editmode/delete_references"),
                add_transition = require("editmode/add_transition"),
                context_menu = require("menu/context_menu"),
                edit_path = require("editmode/edit_path"),
                edit_state = require("editmode/edit_state");

            //iterates over svg circles (representing states)
            d3.selectAll("circle").each(function(){
                //on right click, call a context menu to delete or edit state
                d3.select(this).on("contextmenu",function(d){
                    switch (context_menu) {
                        case "delete":
                            deleteState(d);
                            break;
                        default:
                            deleteState(d);
                    }
                });
                //on double click, select a state
                //on a second double click on a state, create a link between them
                //(can be the same state, source state cannot be terminal)
                d3.select(this).on("dblclick",function(d){
                    createTransition(d);
                });
                //on echap cancel all linking process
                d3.select(document).on("keyup",function(){
                    if(d3.event.keyCode==27){
                        d3.selectAll("circle").each(function(d){    //testing if a state is being linked
                            if(d.graphicEditor.linking){    //if linking, undo process and thus remove linking class
                                d.graphicEditor.linking=false;
                                d3.select("#state_"+d.index).classed("linking",false);
                            }
                        });
                    }
                    if(d3.event.keyCode==69){
                        d3.selectAll("circle").each(function(d){    //testing if a state is being linked
                            if(d.graphicEditor.linking && (d3.select("#state_"+d.index).classed("editing")===false)){    //if linking edit state
                                d3.select("#state_"+d.index).classed("editing",true);
                                confirmStateEdition(d);
                            }
                        });
                    }
                });
            });
            //delete state w/ confirmation
            function deleteState(d){
                d3.event.preventDefault();
                confirmDelete(d);
            }
            //create a new link
            function createTransition(d){
                d3.event.preventDefault();
                var linkingTest = false,
                    thisID = "#state_"+d.index;

                d3.selectAll("circle").each(function(d){    //testing if a first state is selected (being linked)
                    if(d.graphicEditor.linking){
                        linkingTest=d;
                    }
                });
                if(linkingTest){    //if a first state is selected, ask wether cancel or create link then reset linking
                    d3.select(thisID).classed("linking",true);
                    confirmTransition(d,linkingTest,thisID);
                }else{  //first selection of state
                    if(d.terminal){ //disalow w/ an alert if the state is terminal
                        alertTerminal();
                    }else{
                        d.graphicEditor.linking=true;
                        d3.select(thisID).classed("linking",true);
                    }
                }
            }

            //confirmation functions (w/ swal)
            //delete
            function confirmDelete(d){
                swal({
                    title: "Delete this state?",
                    text: "Transition related to this state will be deleted too",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it",
                    closeOnConfirm: false
                },function(){
                    delete_state(d.index,{"svg":svg,"force":force,"getData":getData,"links":links});
                    delete_references(d.name,getData);
                    swal("Deleted!", "The state \""+d.name+"\" has been deleted.", "success");
                    //edit fe object
                    var utility = require("utility/utility"),
                        data_helper = require("viewmode/data_helper"),
                    displayableData = data_helper.cleanData(getData);
                    utility.frontEndObject([displayableData]);
                    //
                });
            }
            //transition editing
            function confirmTransition(d,linkingTest,thisID){
                var swalTransition = swal({
                    title: "Create transition ?",
                    text: "Create transition between states \""+linkingTest.name+"\" and \""+d.name+"\" ?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, create it",
                    closeOnConfirm: false
                },function(confirmed){
                    if(confirmed){
                        getCondition(d,linkingTest,thisID);
                    }else{
                        d.graphicEditor.linking=false;
                        d3.select(thisID).classed("linking",false);
                    }
                });
            }
            function getCondition(d,linkingTest,thisID){
                var linkingTestID = "#state_"+linkingTest.index;
                var condition = ""
                    previouslyExistingLink=false;
                var swalCondition = swal({
                    title: "Condition",
                    text: "Write a condition for this new transition",
                    type: "input",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    animation: "slide-from-top",
                    inputPlaceholder: "condition"
                },function(inputValue,confirmed){
                    if (inputValue === false){  //on cancel
                        //edit visual hints
                        linkingTest.graphicEditor.linking=false;
                        d.graphicEditor.linking=false;
                        d3.select(linkingTestID).classed("linking",false);
                        d3.select(thisID).classed("linking",false);
                        return false;
                    }
                    if (inputValue === "") {    //if no value is entered
                        swal.showInputError("You need to write a condition");
                        return false;
                    }
                    d3.select(linkingTestID).data()[0].transitions.forEach(function(el,ind,arr){    //if alreay exists, cancel
                        if(el.target===d.name){
                            previouslyExistingLink = true;
                            if(el.condition===inputValue){
                                inputValue=false;
                            }
                        }
                    });
                    if(inputValue){
                        //all condition passed
                        condition = inputValue;
                        if(previouslyExistingLink){
                            edit_path(svg,force,linkingTest.index,d.index,condition); //edit path
                        }else{
                            edit_path(svg,force,linkingTest.index,d.index,condition,"new"); //edit path
                        }
                        add_transition(linkingTest,d,condition,getData);    //add transition to global data object
                        //edit visual hints
                        linkingTest.graphicEditor.linking=false;
                        d.graphicEditor.linking=false;
                        d3.select(linkingTestID).classed("linking",false);
                        d3.select(thisID).classed("linking",false);
                        //edit fe object
                        var utility = require("utility/utility"),
                            data_helper = require("viewmode/data_helper"),
                        displayableData = data_helper.cleanData(getData);
                        utility.frontEndObject([displayableData]);
                        //
                        //close sweetalert prompt window
                        swal.close();
                    }else{  //transition already exists w/ the same condition
                        swal.showInputError("This condition already exists for the same transition");
                        return false;
                    }
                });
            }
            function alertTerminal(){
                swal({
                    title: "This state is terminal",
                    text: "A terminal states cannot be the source for a new link",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "OK",
                    closeOnConfirm: true
                });
            }
            //state editing
            function confirmStateEdition(d){    //confirm you want to edit selected state
                var swalStateEdition = swal({
                    title: "Edit state "+d.name+" ?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, edit it",
                    closeOnConfirm: false
                },function(confirmed){
                    if(confirmed){
                        getStateEdition(d);
                    }else{
                        d.graphicEditor.linking=false;
                        d3.select("#state_"+d.index).classed("linking",false);
                    }
                });
            }
            function getStateEdition(d){    //get new name w/ prompt-like
                var swalStateInfo = swal({
                    title: "Name Edition",
                    text: "Write a new name",
                    type: "input",
                    inputValue: d.name,
                    showCancelButton: true,
                    closeOnConfirm: false,
                    animation: "slide-from-top"
                },function(inputValue){
                    if(inputValue){  //edit state name if confirmed
                        edit_state(d,inputValue,{"svg":svg,"force":force,"getData":getData,"links":links});
                        d3.select("#state_"+d.index).classed("editing",false);
                    }else if(inputValue===false){  //error in new state name
                        swal.showInputError("Please enter a valid state name");
                        return false;
                    }else if(inputValue===""){  //empty new state name
                        swal.showInputError("Please enter a state name");
                        return false;
                    }
                });
            }

        }
    }
});
