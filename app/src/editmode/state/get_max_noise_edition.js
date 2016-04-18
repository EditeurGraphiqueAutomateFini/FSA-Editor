define(function(require){
    return function (d,context){
        var edit_state_maxnoise = require("editmode/state/edit_state_maxnoise"),
            cancel_selection = require("editmode/cancel_selection"),
            undo = require("utility/undo"),
            edit_frontend_object = require("editmode/edit_frontend_object");

        var swalStateInfo = swal({
            title : "Max noise edition",
            text : "Write a new value",
            type : "input",
            inputType : "number",
            inputValue : d.max_noise,
            showCancelButton : true,
            closeOnConfirm : false,
            animation : "slide-from-top"
        },function(inputValue){
            if(inputValue){  //edit state name if confirmed
                if(parseInt(inputValue) < 0){ //negative noise
                    swal.showInputError("max_noise cannot be negative");
                    return false;
                }else if(parseInt(inputValue) > parseInt(d.max_total_noise)){
                    swal.showInputError("max_noise cannot be > max_total_noise ("+d.max_total_noise+")");
                    return false;
                }else{
                    edit_state_maxnoise(d,inputValue,context);
                    cancel_selection(d);
                    edit_frontend_object(context.getData);
                    undo.addToStack(context.getData);
                    swal.close();   //close sweetalert prompt window
                }
            }else if(inputValue === false){  //cancel
                cancel_selection(d);
                return false;
            }else if(inputValue === ""){  //empty noise
                swal.showInputError("Please enter a value");
                return false;
            }
        });
    }
});
