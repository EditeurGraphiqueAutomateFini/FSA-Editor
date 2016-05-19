/**
*   Sweetalert prompt for condition edition
*   @module editmode/transition/get_condition
*   @param {Object} d - data for the state, supplied by D3
*   @param {Object} previouslySelectedState - the source state (previously selected)
*   @param {string} thisID - a string containing the html id of the target state (e.g. : "#state_1");
*   @param {Object} context - the global application context (svg,force,getData,links)
*/
define(function(require){
    var get_condition = function(d,previouslySelectedState,thisID,context){
        var add_transition = require("./add_transition");
        var edit_condition = require("./edit_condition");
        var get_transition_edition = require("./get_transition_edition");
        var undo = require("../../utility/undo");
        var edit_frontend_object = require("../edit_frontend_object");

        var linkingTestID = "#state_"+previouslySelectedState.index;
        var previouslyExistingLink = false;

        swal({
            title : "Condition",
            text : "Write a condition for this new transition",
            type : "input",
            showCancelButton : true,
            closeOnConfirm : false,
            animation : "slide-from-top",
            inputPlaceholder : "condition"
        },function(inputValue){
            // on cancel
            if (inputValue === false){
                // edit visual hints
                previouslySelectedState.graphicEditor.linking = false;
                d.graphicEditor.linking = false;
                d3.select(linkingTestID).classed("linking",false);
                d3.select(linkingTestID).classed("editing",false);
                d3.select(thisID).classed("linking",false);
                return false;
            }
            // if no value is entered
            if (inputValue === "") {
                swal.showInputError("You need to write a condition");
                return false;
            }
            // if there is a comma (",") in the input value
            if(inputValue.indexOf(",") !== -1){
                swal.showInputError("\',\' is not allowed for transitions");
                return false;
            }
            // error : if link alreay exists with the condition
            if(d3.select(linkingTestID).data()[0].hasOwnProperty("transitions")){
                d3.select(linkingTestID).data()[0].transitions.forEach(function(el){
                    if(el.target === d.name){
                        if(el.condition === inputValue){
                            inputValue = false;
                        }
                    }
                });
            }
            // if path already exist
            if(d3.selectAll("path.link#link_"+previouslySelectedState.index+"_"+d.index).size() > 0){
                previouslyExistingLink = true;
            }
            // all test has passed
            if(inputValue){
                var condition = inputValue;

                // add transition to global data object
                add_transition(context.force,context.getData,previouslySelectedState,d,condition);

                if(previouslyExistingLink){
                    // edit path
                    edit_condition(context.svg,context.force,previouslySelectedState.index,d.index,condition);
                }else{
                    // edit path
                    edit_condition(context.svg,context.force,previouslySelectedState.index,d.index,condition,"new");
                    d3.select("text.condition.link_"+previouslySelectedState.index+"_"+d.index)
                        .on("click",function(d){
                            get_transition_edition(d,context);
                        });
                }

                // edit visual hints
                previouslySelectedState.graphicEditor.linking = false;
                d.graphicEditor.linking = false;
                d3.select(linkingTestID).classed("linking",false);
                d3.select(linkingTestID).classed("editing",false);
                d3.select(thisID).classed("linking",false);

                // edit fe object
                edit_frontend_object(context.getData);
                undo.addToStack(context.getData);

                // close sweetalert prompt window
                swal.close();
            // error : transition already exists w/ the same condition
            }else{
                swal.showInputError("This condition already exists for the same transition");
                return false;
            }
        });
    };
    return get_condition;
});
