/**
*   Sweetalert prompt for state name edition
*   @module editmode/state/get_state_name_edition
*   @param {Object} d - data for the state, supplied by D3
*   @param {Object} context - the global application context (svg,force,getData,links)
*/
define(function(require){
    var get_state_name_edition = function (d,context){
        var edit_references = require("./edit_references");
        var edit_state_name = require("./edit_state_name");
        var cancel_selection = require("../cancel_selection");
        var undo = require("../../utility/undo");
        var edit_frontend_object = require("../edit_frontend_object");

        swal({
            title : "State Edition",
            text : "Write a new name",
            type : "input",
            inputValue : d.name,
            showCancelButton : true,
            closeOnConfirm : false,
            animation : "slide-from-top"
        },function(inputValue){
            // edit state name if confirmed
            if(inputValue){
                if(inputValue !== d.name){

                    // check if name already exists
                    for(var state in context.getData.states){
                        if(context.getData.states.hasOwnProperty(state) && context.getData.states[state]){
                            // error : the name already exists
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

                // close sweetalert prompt window
                swal.close();
            // on cancel
            }else if(inputValue === false){
                cancel_selection(d);
                return false;
            // on empty new state name
            }else if(inputValue === ""){
                swal.showInputError("Please enter a state name");
                return false;
            }
        });
    };
    return get_state_name_edition;
});
