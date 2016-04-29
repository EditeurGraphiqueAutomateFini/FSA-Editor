define(function(require){
    return function(d,previouslySelectedState,thisID,context){
        var add_transition = require("./add_transition"),
            edit_condition = require("./edit_condition"),
            get_transition_edition = require("./get_transition_edition"),
            undo = require("../../utility/undo"),
            edit_frontend_object = require("../edit_frontend_object");

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
            if (inputValue === false){  // on cancel
                // edit visual hints
                previouslySelectedState.graphicEditor.linking = false;
                d.graphicEditor.linking = false;
                d3.select(linkingTestID).classed("linking",false);
                d3.select(thisID).classed("linking",false);
                return false;
            }
            if (inputValue === "") {    // if no value is entered
                swal.showInputError("You need to write a condition");
                return false;
            }
            if(inputValue.indexOf(",") !== -1){
                swal.showInputError("\',\' is not allowed for transitions");
                return false;
            }
            if(d3.select(linkingTestID).data()[0].hasOwnProperty("transitions")){   // if link alreay exists width the condition, error message
                d3.select(linkingTestID).data()[0].transitions.forEach(function(el){
                    if(el.target === d.name){
                        if(el.condition === inputValue){
                            inputValue = false;
                        }
                    }
                });
            }
            if(d3.selectAll("path.link#link_"+previouslySelectedState.index+"_"+d.index).size() > 0){   // if path already exist
                previouslyExistingLink = true;
            }
            if(inputValue){
                // all condition passed
                var condition = inputValue;

                add_transition(context.force,context.getData,previouslySelectedState,d,condition);    // add transition to global data object

                if(previouslyExistingLink){
                    edit_condition(context.svg,context.force,previouslySelectedState.index,d.index,condition); // edit path
                }else{
                    edit_condition(context.svg,context.force,previouslySelectedState.index,d.index,condition,"new"); // edit path
                    d3.select("text.condition.link_"+previouslySelectedState.index+"_"+d.index)
                        .on("click",function(d){
                            get_transition_edition(d,context);
                        });
                }
                // edit visual hints
                previouslySelectedState.graphicEditor.linking = false;
                d.graphicEditor.linking = false;
                d3.select(linkingTestID).classed("linking",false);
                d3.select(thisID).classed("linking",false);
                // edit fe object
                edit_frontend_object(context.getData);
                undo.addToStack(context.getData);
                // close sweetalert prompt window
                swal.close();
            }else{  // transition already exists w/ the same condition
                swal.showInputError("This condition already exists for the same transition");
                return false;
            }
        });
    };
});
