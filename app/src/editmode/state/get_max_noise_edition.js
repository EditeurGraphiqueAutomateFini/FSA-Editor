/**
*   Sweetalert prompt for max_noise property edition
*   @module editmode/state/get_max_noise_edition
*/
define(function(require){
    /**
    *   @constructor
    *   @alias module:editmode/state/get_max_noise_edition
    *   @param {Object} d - data for the state, supplied by D3
    *   @param {Object} context - the global application context (svg,force,getData,links)
    */
    var get_max_noise_edition = function (d,context){
        var edit_state_maxnoise = require("./edit_state_maxnoise");
        var cancel_selection = require("../cancel_selection");
        var undo = require("../../utility/undo");
        var edit_frontend_object = require("../edit_frontend_object");

        swal({
            title : "Max noise edition",
            text : "Write a new value",
            type : "input",
            inputType : "number",
            inputValue : d.max_noise,
            showCancelButton : true,
            closeOnConfirm : false,
            animation : "slide-from-top"
        },function(inputValue){
            // edit state name if confirmed
            if(inputValue){
                // error : negative noise
                if(parseInt(inputValue) < 0){
                    swal.showInputError("max_noise cannot be negative");
                    return false;
                // error : noise above max_noise
                }else if(parseInt(inputValue) > parseInt(d.max_total_noise)){
                    swal.showInputError("max_noise cannot be > max_total_noise ("+d.max_total_noise+")");
                    return false;
                // no error, edit property
                }else{
                    edit_state_maxnoise(d,inputValue,context);
                    cancel_selection(d);
                    edit_frontend_object(context.getData);
                    undo.addToStack(context.getData);

                    // close sweetalert prompt window
                    swal.close();
                }
            // on cancel
            }else if(inputValue === false){
                cancel_selection(d);
                return false;
            // on empty value
            }else if(inputValue === ""){
                swal.showInputError("Please enter a value");
                return false;
            }
        });
    };
    return get_max_noise_edition;
});
