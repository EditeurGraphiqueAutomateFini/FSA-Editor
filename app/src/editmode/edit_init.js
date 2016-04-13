define(function(require){
    return{
        init: function(svg,force,getData,links){
            var context_menu = require("menu/context_menu"),
                delete_state = require("editmode/delete_state"),
                delete_references = require("editmode/delete_references"),
                edit_references = require("editmode/edit_references"),
                add_transition = require("editmode/add_transition"),
                edit_transition = require("editmode/edit_transition"),
                delete_transition = require("editmode/delete_transition"),
                edit_path = require("editmode/edit_path"),
                edit_state = require("editmode/edit_state"),
                edit_state_name = require("editmode/edit_state_name"),
                edit_state_maxnoise = require("editmode/edit_state_maxnoise"),
                editmode = require("editmode/edit_init"),
                viewmode = require("viewmode/view_init"),
                undo = require("utility/undo");

            //on click on background cancel state selection
            d3.select("#svgbox").on("click",cancelAllSelection);
            force.drag().on("drag",function(d){d.graphicEditor.unselectable=true;});
            force.drag().on("dragend",function(){});    //cancel context saving on drag/click

            //iterates over svg circles (representing states)
            d3.selectAll("circle").each(function(){
                d3.select(this)
                    //on right click, call a context menu to delete or edit state
                    .on("contextmenu",function(d){
                        switch (context_menu) {
                            case "delete":
                                deleteState(d);
                                break;
                            default:
                                break;
                        }
                    })
                    //on double click, select a state
                    //on a second double click on a state, create a link between them
                    //(can be the same state, source state cannot be terminal)
                    .on("click",function(d){
                        d3.event.stopPropagation();     //stop bubbling to avoid ending in background click event
                        d3.event.preventDefault();      //in case of right click
                        if(!d.graphicEditor.unselectable){
                            selectState(d);
                        }else{
                            d.graphicEditor.unselectable=false;
                        }
                    });
            });
            d3.selectAll("text.state_name .state_name_label").each(function(){
                d3.select(this)
                    .on("click",function(d){
                        getStateNameEdition(d);
                    });
            });
            d3.selectAll("text.state_name .state_name_maxnoise").each(function(){
                d3.select(this)
                    .on("click",function(d){
                        getMaxNoiseEdition(d);
                    });
            });
            d3.selectAll("text.condition").each(function(){
                d3.select(this)
                    .on("click",function(d){
                        getTransitionEdition(d);
                    });
            });

            //key bingings
            d3.select(document).on("keyup",function(){
                //ajouter un preventdefault pour les actions de base du nav ?
                if(d3.event.ctrlKey){   // key "CTRL" is pressed
                    switch (d3.event.keyCode) {
                        case 90:    // on key "CTRL + Z" rollback
                            var rollBack = undo.rollBack();
                            if(rollBack){   //if any action has already been performed
                                var newLoadedViewMode = viewmode.init(viewmode.extractStates([rollBack]),rollBack,true);
                                editmode.init(newLoadedViewMode.svg,newLoadedViewMode.force,newLoadedViewMode.getData,newLoadedViewMode.links);
                            }
                            break;
                        case 89:    // on key "CTRL + Z" rollback
                            var rollForth = undo.rollForth();
                            if(rollForth){   //if any action has already been performed
                                var newLoadedViewMode = viewmode.init(viewmode.extractStates([rollForth]),rollForth,true);
                                editmode.init(newLoadedViewMode.svg,newLoadedViewMode.force,newLoadedViewMode.getData,newLoadedViewMode.links);
                            }
                            break;
                        default:
                            break;
                    }
                }else{  // key "CTRL" is not pressed
                    switch(d3.event.keyCode){
                        case 27:    //on key "ECHAP" cancel all linking process
                            cancelAllSelection();
                            break;
                        case 46:    // on key "SUPPR" delete state
                            d3.selectAll("circle").each(function(d){
                                if(isEligible(d)){
                                    deleteState(d);
                                }
                            });
                            break;
                        case 69:    // on key "E" edit state name
                            d3.selectAll("circle").each(function(d){    //testing if a state is being linked
                                if(isEligible(d)){
                                    d3.select("#state_"+d.index).classed("editing",true);
                                    getStateEdition(d);
                                }
                            });
                            break;
                        case 77:    //on key "M" edit max_noise
                            d3.selectAll("circle").each(function(d){    //testing if a state is being linked
                                if(isEligible(d)){
                                    d3.select("#state_"+d.index).classed("editing",true);
                                    getMaxNoiseEdition(d);
                                }
                            });
                        default:
                            break;
                    }
                }
            });

            //delete state w/ confirmation
            function deleteState(d){
                delete_state(d.index,{"svg":svg,"force":force,"getData":getData,"links":links});
                delete_references(getData,d.name);
                //edit fe object
                editFrontEndObject();
                undo.addToStack(getData);
            }
            //create a new link
            function selectState(d){
                var previouslySelectedState = false,
                    currentStateId = "#state_"+d.index;

                d3.selectAll("circle").each(function(d){    //testing if a first state is selected (being linked)
                    if(d.graphicEditor.linking){
                        previouslySelectedState=d;
                    }
                });
                if(previouslySelectedState){    //if a first state is selected, create new transition
                    d3.select(currentStateId).classed("linking",true);
                    getCondition(d,previouslySelectedState,currentStateId);
                }else{  //first selection of state
                    d.graphicEditor.linking=true;
                    d3.select(currentStateId).classed("linking",true);
                }
            }

            //test if a state is eligible for alteration
            function isEligible(d){
                if( //if linking edit state
                    d.graphicEditor.linking
                    && (d3.select("#state_"+d.index).classed("editing")===false)
                    && (d3.selectAll(".linking").size()===1)
                 ){
                     return true;
                 }else{
                     return false;
                 }
            }

            //transition editing
            function getCondition(d,previouslySelectedState,thisID){
                var linkingTestID = "#state_"+previouslySelectedState.index;
                var previouslyExistingLink=false;
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
                        previouslySelectedState.graphicEditor.linking=false;
                        d.graphicEditor.linking=false;
                        d3.select(linkingTestID).classed("linking",false);
                        d3.select(thisID).classed("linking",false);
                        return false;
                    }
                    if (inputValue === "") {    //if no value is entered
                        swal.showInputError("You need to write a condition");
                        return false;
                    }
                    if(d3.select(linkingTestID).data()[0].hasOwnProperty("transitions")){   //if link alreay exists width the condition, error message
                        d3.select(linkingTestID).data()[0].transitions.forEach(function(el,ind,arr){
                            if(el.target===d.name){
                                if(el.condition===inputValue){
                                    inputValue=false;
                                }
                            }
                        });
                    }
                    if(d3.selectAll("path.link#link_"+previouslySelectedState.index+"_"+d.index).size()>0){   //if path already exist
                        previouslyExistingLink = true;
                    }
                    if(inputValue){
                        //all condition passed
                        var condition = inputValue;
                        if(previouslyExistingLink){
                            edit_path(svg,force,previouslySelectedState.index,d.index,condition); //edit path
                        }else{
                            edit_path(svg,force,previouslySelectedState.index,d.index,condition,"new"); //edit path
                            d3.select("text.condition.link_"+previouslySelectedState.index+"_"+d.index)
                                .on("click",function(d){
                                    getTransitionEdition(d);
                                });
                        }
                        add_transition(force,getData,previouslySelectedState,d,condition);    //add transition to global data object
                        //edit visual hints
                        previouslySelectedState.graphicEditor.linking=false;
                        d.graphicEditor.linking=false;
                        d3.select(linkingTestID).classed("linking",false);
                        d3.select(thisID).classed("linking",false);
                        //edit fe object
                        editFrontEndObject();
                        undo.addToStack(getData);
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
            function getStateEdition(d){
                var swalTransitionInfo = swal({
                    title: d.name,
                    text: displayStateAsList(d),
                    html: true,
                    showCancelButton: true,
                    closeOnConfirm: false,
                    animation: "slide-from-top"
                },function(inputValue){
                    if(inputValue){
                        var newName = "",
                            newTerminal = false,
                            newMaxNoise = 0,
                            newMaxTotalNoise = 0,
                            newMaxDuration = 0,
                            newMaxTotalDuration = 0,
                            newDefaultTransition = {
                                "condition":"",
                                "target":0
                            };
                        //name
                        newName = d3.select("#input_name_"+d.index).property("value");
                        //terminal
                        newTerminal = d3.select("#input_terminal_"+d.index).property("checked");
                        //max_noise
                        newMaxNoise = d3.select("#input_max_noise_"+d.index).property("value");
                        //max_total_noise
                        newMaxTotalNoise = d3.select("#input_max_total_noise_"+d.index).property("value");
                        //max_duration
                        newMaxDuration = d3.select("#input_max_duration_"+d.index).property("value");
                        //max_total_duration
                        newMaxTotalDuration = d3.select("#input_max_total_duration_"+d.index).property("value");
                        //default_transition
                        newDefaultTransition.condition = d3.select("#input_default_transition_condition_"+d.index).property("value");
                        newDefaultTransition.target = d3.select("#input_default_transition_target_"+d.index).property("value");

                        //tests
                        if(newMaxNoise < 0){
                            swal.showInputError("max_noise cannot be negative");
                            return false;
                        }
                        if(newMaxTotalNoise < 0){
                            swal.showInputError("max_total_noise cannot be negative");
                            return false;
                        }
                        if(newMaxDuration < 0){
                            swal.showInputError("max_duration cannot be negative");
                            return false;
                        }
                        if(newMaxTotalDuration < 0){
                            swal.showInputError("max_total_duration cannot be negative");
                            return false;
                        }
                        if(newDefaultTransition.condition.indexOf(",")!==-1){
                            swal.showInputError("conditions cannot have commas");
                            return false;
                        }
                        //
                        var newValues = {
                            "newName":newName,
                            "newTerminal":newTerminal,
                            "newMaxNoise":newMaxNoise,
                            "newMaxTotalNoise":newMaxTotalNoise,
                            "newMaxDuration":newMaxDuration,
                            "newMaxTotalDuration":newMaxTotalDuration,
                            "newDefaultTransition":newDefaultTransition
                        }
                        edit_state(newValues,d,{"force":force,"getData":getData});

                        cancelSelection(d);
                        editFrontEndObject();
                        undo.addToStack(getData);
                        swal.close();   //close sweetalert prompt window
                    }else if(inputValue===false){  //cancel
                        cancelSelection(d);
                        return false;
                    }else if(inputValue===""){
                        swal.showInputError("error");
                        return false;
                    }
                });
            }
            function getStateNameEdition(d){    //get new name w/ prompt-like
                var swalStateInfo = swal({
                    title: "State Edition",
                    text: "Write a new name",
                    type: "input",
                    inputValue: d.name,
                    showCancelButton: true,
                    closeOnConfirm: false,
                    animation: "slide-from-top"
                },function(inputValue){
                    if(inputValue){  //edit state name if confirmed
                        edit_references(getData,d.name,inputValue);
                        edit_state_name(d,inputValue,{"svg":svg,"force":force,"getData":getData,"links":links});
                        cancelSelection(d);
                        editFrontEndObject();
                        undo.addToStack(getData);
                        swal.close();   //close sweetalert prompt window
                    }else if(inputValue===false){  //cancel
                        cancelSelection(d);
                        return false;
                    }else if(inputValue===""){  //empty new state name
                        swal.showInputError("Please enter a state name");
                        return false;
                    }
                });
            }
            function getMaxNoiseEdition(d){
                var swalStateInfo = swal({
                    title: "Max noise edition",
                    text: "Write a new value",
                    type: "input",
                    "inputType":"number",
                    inputValue: d.max_noise,
                    showCancelButton: true,
                    closeOnConfirm: false,
                    animation: "slide-from-top"
                },function(inputValue){
                    if(inputValue){  //edit state name if confirmed
                        if(parseInt(inputValue)<0){ //negative noise
                            swal.showInputError("max_noise cannot be negative");
                            return false;
                        }else{
                            edit_state_maxnoise(d,inputValue,{"svg":svg,"force":force,"getData":getData,"links":links});
                            cancelSelection(d);
                            editFrontEndObject();
                            undo.addToStack(getData);
                            swal.close();   //close sweetalert prompt window
                        }
                    }else if(inputValue===false){  //cancel
                        cancelSelection(d);
                        return false;
                    }else if(inputValue===""){  //empty noise
                        swal.showInputError("Please enter a value");
                        return false;
                    }
                });
            }
            function displayStateAsList(d){
                var html = "",
                    currentState = getData.states[d.name];
                    input="",
                    propertiesToEdit=[
                        { "name":"name", "type":"text" },
                        { "name":"terminal", "type":"check" },
                        { "name":"max_noise", "type":"number" },
                        { "name":"max_total_noise", "type":"number" },
                        { "name":"max_duration", "type":"number" },
                        { "name":"max_total_duration", "type":"number" },
                        { "name":"default_transition", "type":"transition" }
                    ];

                for(var i=0;i<propertiesToEdit.length;i++){
                    switch(propertiesToEdit[i].type){
                        case "text":
                            input = "<input "+
                                        "class='custom_swal_input' "+
                                        "type='text' "+
                                        "value='"+(currentState[propertiesToEdit[i].name] || "")+"' "+
                                        "id='input_"+propertiesToEdit[i].name+"_"+d.index+"' "+
                                    "/>"
                            break;
                        case "number":
                            input = "<input "+
                                        "class='custom_swal_input' "+
                                        "type='number' "+
                                        "value='"+(currentState[propertiesToEdit[i].name] || "")+"' "+
                                        "id='input_"+propertiesToEdit[i].name+"_"+d.index+"' "+
                                    "/>"
                            break;
                        case "check":
                            input = "<input "+
                                        "class='custom_swal_input' "+
                                        "type='checkbox' "+
                                        (currentState[propertiesToEdit[i].name] ? "checked='true' " : "")+
                                        "id='input_"+propertiesToEdit[i].name+"_"+d.index+"' "+
                                    "/>"
                            break;
                        case "transition":
                            options = "",
                            hasSelection=false;
                            for(var state in getData.states){
                                if(getData.states.hasOwnProperty(state) && getData.states[state]!==undefined){
                                    if(currentState[propertiesToEdit[i].name]!==undefined && currentState[propertiesToEdit[i].name].target===state){
                                        hasSelection=state;
                                    }
                                     options+="<option "+
                                                    (hasSelection===state ? "selected='true'" : "")+
                                                    "value='"+getData.states[state].index+
                                                "'>"+
                                                    state+
                                                "</option>";
                                    }
                             }
                            input = "<span class='swal_select_container'>"+
                                        "<span class='swal_select_subcontainer'>"+
                                            //"<span class='sub_label'>default_transition_condition : </span>"+
                                            "<input "+
                                                "class='custom_swal_input default_transtion_input' "+
                                                "type='text' "+
                                                "value='"+((currentState[propertiesToEdit[i].name]!==undefined ? currentState[propertiesToEdit[i].name].condition : "") || "")+"' "+
                                                "id='input_"+propertiesToEdit[i].name+"_condition_"+d.index+"' "+
                                                "placeholder='condition'"+
                                            "/>"+
                                        "</span>"+
                                        "<span class='swal_select_subcontainer'>"+
                                            //"<span class='sub_label'>default_transition_target : </span>"+
                                            "<select "+
                                                "class='custom_swal_select' "+
                                                "id='input_"+propertiesToEdit[i].name+"_target_"+d.index+"' "+
                                            ">"+
                                                "<option "+( hasSelection ? "" : "selected='true'" )+" value=''>Select a target</option>"+
                                                options +
                                            "</select>"+
                                        "</span>"+
                                    "</span>"

                            break;
                        default:
                            break;
                    }
                    html+="<span class='swal_display state_display state_display_"+d.index+"'>"+
                                "<label "+
                                    "class='custom_swal_label' "+
                                    "for='input_"+propertiesToEdit[i].name+"_"+d.index+"' "+
                                    "id='label_property_"+propertiesToEdit[i].name+"'"+
                                ">"
                                    +propertiesToEdit[i].name+" : "+
                                "</label>"+
                                input+
                            "</span>";
                }

                return html;
            }

            //transition editing
            function getTransitionEdition(d){    //get new name w/ prompt-like
                var swalTransitionInfo = swal({
                    title: "Transition Edition",
                    text: displayTransitionsAsList(d),
                    html: true,
                    showCancelButton: true,
                    closeOnConfirm: false,
                    animation: "slide-from-top"
                },function(inputValue){
                    if(inputValue){
                        var conditionsToDelete = [],
                            conditionsToEdit = [],
                            commaError = false;

                        d3.selectAll(".condition_display.user_delete input").each(function(){conditionsToDelete.push(this.value);});
                        d3.selectAll(".condition_display.user_edited input").each(function(){
                            conditionsToEdit.push({
                                "index":this.id.slice("input_condition_".length),
                                "updatedValue":this.value
                            });
                        });

                        if(conditionsToDelete.length>0){
                            delete_transition(d,conditionsToDelete,{"svg":svg,"force":force,"getData":getData,"links":links});
                        }
                        if(conditionsToEdit.length>0){
                            conditionsToEdit.forEach(function(el){
                                if(el.updatedValue.indexOf(",")!=-1){
                                    commaError = true;
                                }
                            });
                            if(commaError){
                                swal.showInputError("\',\' is not allowed for transitions");
                                return false;
                            }else{
                                edit_transition(d,conditionsToEdit,{"svg":svg,"force":force,"getData":getData,"links":links});
                            }
                        }

                        editFrontEndObject();
                        undo.addToStack(getData);
                        swal.close();   //close sweetalert prompt window
                    }else if(inputValue===false){  //cancel
                        return false;
                    }else if(inputValue===""){
                        swal.showInputError("error");
                        return false;
                    }
                });
                d3.selectAll(".custom_swal_delete").each(function(){
                    d3.select(this)
                        .on("click",function(){
                            d3.select(this.parentNode).classed("user_delete",true);
                        });
                });
                d3.selectAll(".condition_display input").each(function(){
                    d3.select(this)
                        .on("change",function(){
                            d3.select(this.parentNode).classed("user_edited",true);
                        });
                })
            }
            function displayTransitionsAsList(d){
                var html = d.source.name + " ==> " + d.target.name,
                    conditions = d.condition.split(",");

                conditions.forEach(function(condition,index){
                    html+="<span class='swal_display condition_display condition_display_"+index+"'>"+
                            "<span class='custom_swal_delete' id='delete_condition_"+index+"'>X</span>"+
                            "<input class='custom_swal_input' type='text' value='"+condition+"' id='input_condition_"+index+"' />"+
                        "</span>";
                });

                return html;
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
            //cancel on selection
            function cancelSelection(d){
                d3.select("#state_"+d.index).classed("editing",false);
                d.graphicEditor.linking=false;
                d3.select("#state_"+d.index).classed("linking",false);
            }

            //edit fe object
            function editFrontEndObject(){
                var utility = require("utility/utility"),
                    data_helper = require("viewmode/data_helper"),
                    displayableData = data_helper.cleanData(getData);
                utility.frontEndObject([displayableData]);
            }

        }
    }
});
