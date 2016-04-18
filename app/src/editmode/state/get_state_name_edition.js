define(function(require){
    return function (d,context){    // get new name w/ prompt-like
        var edit_references = require("editmode/state/edit_references"),
            edit_state_name = require("editmode/state/edit_state_name"),
            cancel_selection = require("editmode/cancel_selection"),
            undo = require("utility/undo"),
            edit_frontend_object = require("editmode/edit_frontend_object");

        swal({
            title : "State Edition",
            text : "Write a new name",
            type : "input",
            inputValue : d.name,
            showCancelButton : true,
            closeOnConfirm : false,
            animation : "slide-from-top"
        },function(inputValue){
            if(inputValue){  // edit state name if confirmed
                if(inputValue !== d.name){

                    // check if name already exists
                    for(var state in context.getData.states){
                        if(context.getData.states.hasOwnProperty(state) && context.getData.states[state]){
                            if(inputValue === context.getData.states[state].name && context.getData.states[state].index !== d.index){
                                swal.showInputError("A state with this name already exists");
                                return false;
                            }
                        }
                    }

                    edit_references(context.getData,d.name,inputValue);
                    edit_state_name(d,inputValue,context);
                    cancel_selection(d);
                    edit_frontend_object(context.getData);
                    undo.addToStack(context.getData);
                }
                swal.close();   // close sweetalert prompt window
            }else if(inputValue === false){  // cancel
                cancel_selection(d);
                return false;
            }else if(inputValue === ""){  // empty new state name
                swal.showInputError("Please enter a state name");
                return false;
            }
        });
    }
});
