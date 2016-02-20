define(function(require){
    return{
        init: function(svg,force,getData,links){
            var delete_state = require("editmode/delete_state"),
                delete_references = require("editmode/delete_references"),
                edit_references = require("editmode/edit_references"),
                add_transition = require("editmode/add_transition"),
                context_menu = require("menu/context_menu"),
                edit_path = require("editmode/edit_path"),
                edit_state = require("editmode/edit_state");

            //on click on background cancel state selection
            d3.select("#svgbox").on("click",cancelAllSelection);
            force.drag().on("drag",function(d){d.graphicEditor.unselectable=true;});

            //iterates over svg circles (representing states)
            d3.selectAll("circle").each(function(){
                //on right click, call a context menu to delete or edit state
                d3.select(this).on("contextmenu",function(d){
                    switch (context_menu) {
                        case "delete":
                            deleteState(d);
                            break;
                        default:
                            break;
                    }
                });
                //on double click, select a state
                //on a second double click on a state, create a link between them
                //(can be the same state, source state cannot be terminal)
                d3.select(this).on("click",function(d){
                    d3.event.stopPropagation();     //stop bubbling to avoid ending in background click event
                    if(!d.graphicEditor.unselectable){
                        createTransition(d);
                    }else{
                        d.graphicEditor.unselectable=false;
                    }
                });
                d3.select(document).on("keyup",function(){
                    if(d3.event.keyCode==27){ //on echap cancel all linking process
                        cancelAllSelection();
                    }
                    if(d3.event.keyCode==69){ // on key "E" edit state name
                        d3.selectAll("circle").each(function(d){    //testing if a state is being linked
                            if(isEligible(d)){
                                d3.select("#state_"+d.index).classed("editing",true);
                                getStateEdition(d);
                            }
                        });
                    }
                    if(d3.event.keyCode==46){ // on key "suppr" delete state
                        d3.selectAll("circle").each(function(d){
                            if(isEligible(d)){
                                deleteState(d);
                            }
                        });
                    }
                });
            });
            //delete state w/ confirmation
            function deleteState(d){
                delete_state(d.index,{"svg":svg,"force":force,"getData":getData,"links":links});
                delete_references(getData,d.name);
                //edit fe object
                var utility = require("utility/utility"),
                    data_helper = require("viewmode/data_helper"),
                displayableData = data_helper.cleanData(getData);
                utility.frontEndObject([displayableData]);
                //
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
                    getCondition(d,linkingTest,thisID);
                }else{  //first selection of state
                    d.graphicEditor.linking=true;
                    d3.select(thisID).classed("linking",true);
                }
            }

            //test if a state is eligible for alteration
            function isEligible(d){
                if( //if linking edit state
                    d.graphicEditor.linking
                    &&  (d3.select("#state_"+d.index).classed("editing")===false)
                    && (d3.selectAll(".linking").size()===1)
                 ){
                     return true;
                 }else{
                     return false;
                 }
            }

            //confirmation functions (w/ swal)
            //delete
            /*function confirmDelete(d){
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
                    delete_references(getData,d.name);
                    swal("Deleted!", "The state \""+d.name+"\" has been deleted.", "success");
                    //edit fe object
                    var utility = require("utility/utility"),
                        data_helper = require("viewmode/data_helper"),
                    displayableData = data_helper.cleanData(getData);
                    utility.frontEndObject([displayableData]);
                    //
                });
            }*/
            //transition editing
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
                    if(d3.select(linkingTestID).data()[0].hasOwnProperty("transitions")){
                        d3.select(linkingTestID).data()[0].transitions.forEach(function(el,ind,arr){    //if alreay exists, cancel
                            if(el.target===d.name){
                                previouslyExistingLink = true;
                                if(el.condition===inputValue){
                                    inputValue=false;
                                }
                            }
                        });
                    }
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
            //state editing
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
                        edit_references(getData,d.name,inputValue);
                        edit_state(d,inputValue,{"svg":svg,"force":force,"getData":getData,"links":links});
                        d3.select("#state_"+d.index).classed("editing",false);
                        d.graphicEditor.linking=false;
                        d3.select("#state_"+d.index).classed("linking",false);
                        swal.close();   //close sweetalert prompt window
                    }else if(inputValue===false){  //cancel
                        d3.select("#state_"+d.index).classed("editing",false);
                        d.graphicEditor.linking=false;
                        d3.select("#state_"+d.index).classed("linking",false);
                        return false;
                    }else if(inputValue===""){  //empty new state name
                        swal.showInputError("Please enter a state name");
                        return false;
                    }
                });
            }

            //cancel all selections
            function cancelAllSelection(){
                d3.selectAll("circle").each(function(d){    //testing if a state is being linked
                    if(d.graphicEditor.linking){    //if linking, undo process and thus remove linking class
                        d.graphicEditor.linking=false;
                        d3.select("#state_"+d.index).classed("linking",false);
                    }
                });
            }

        }
    }
});
