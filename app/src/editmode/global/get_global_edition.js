/**
*   Sweetalert prompt for global properties edition
*   @module editmode/global/get_global_edition
*/
define(function(require){
        /**
        *   @constructor
        *   @alias module:editmode/global/get_global_edition
        *   @param {Object} context - the global application context (svg,force,getData,links)
        */
        var get_global_edition = function(context){
            var edit_global = require("./edit_global");
            var undo = require("../../utility/undo");
            var edit_frontend_object = require("../../editmode/edit_frontend_object");

            // here we define sweetalert prompt
            swal({
                title : "Edit global properties",
                text : displayGlobalPropertiesAsList(),
                html : true,
                showCancelButton : true,
                closeOnConfirm : false,
                animation : "slide-from-top"
            },function(inputValue){
                    if(inputValue){
                        // defining default value for each field
                        var newOverlap = false;
                        var newDefaultMatcher = "";
                        var newTerminal = false;
                        var newMaxNoise = 0;
                        var newMaxTotalNoise = 0;
                        var newMaxDuration = 0;
                        var newMaxTotalDuration = 0;
                        var newValues;

                        // overlap
                        newOverlap = d3.select("#input_allow_overlap").property("checked");
                        // default_matcher
                        newDefaultMatcher = d3.select("#input_default_matcher").property("value");
                        // terminal
                        newTerminal = d3.select("#input_terminal").property("checked");
                        // max_noise
                        newMaxNoise = parseInt(d3.select("#input_max_noise").property("value"));
                        // max_total_noise
                        newMaxTotalNoise = parseInt(d3.select("#input_max_total_noise").property("value"));
                        // max_duration
                        newMaxDuration = parseInt(d3.select("#input_max_duration").property("value"));
                        // max_total_duration
                        newMaxTotalDuration = parseInt(d3.select("#input_max_total_duration").property("value"));

                        // test if user input is correct
                        if(newMaxNoise < 0){
                            swal.showInputError("max_noise cannot be negative");
                            return false;
                        }
                        if(newMaxNoise > newMaxTotalNoise){
                            swal.showInputError("max_noise cannot be > total_max_noise");
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
                        if(newMaxDuration > newMaxTotalDuration){
                            swal.showInputError("max_duration cannot be > total_max_duration");
                            return false;
                        }
                        if(newMaxTotalDuration < 0){
                            swal.showInputError("max_total_duration cannot be negative");
                            return false;
                        }

                        // values assignment
                        newValues = {
                            "newOverlap" : newOverlap,
                            "newDefaultMatcher" : newDefaultMatcher,
                            "newTerminal" : newTerminal,
                            "newMaxNoise" : newMaxNoise,
                            "newMaxTotalNoise" : newMaxTotalNoise,
                            "newMaxDuration" : newMaxDuration,
                            "newMaxTotalDuration" : newMaxTotalDuration
                        };

                        // call global edition module
                        edit_global(newValues,context);

                        // edit front-end object and add new state to the stack
                        edit_frontend_object(context.getData);
                        undo.addToStack(context.getData);

                        // close sweetalert prompt window
                        swal.close();

                    // on cancel
                    }else if(inputValue === false){
                        return false;
                    // this should never happen
                    }else if(inputValue === ""){
                        swal.showInputError("error");
                        return false;
                    }
            });

            /**
            *   display form with properties list - iterates over each propertie to return a complete form for the sweetalert prompt
            *   @return {string} html - the complete html form for the sweetalert prompt of global properties
            */
            function displayGlobalPropertiesAsList(){
                var html = "";
                var input = "";
                var previousValue;

                // defining each property to edit with a name and a type
                // state_defaults properties have a "sub" field because they are "sub-properties" of state_defaults
                var propertiesToEdit = [
                    { "name":"allow_overlap", "type":"check" },
                    { "name":"default_matcher", "type":"text" },
                    { "name":"state_defaults", "type":"" },
                    { "name":"terminal", "type":"check", "sub":"state_defaults" },
                    { "name":"max_noise", "type":"number", "sub":"state_defaults" },
                    { "name":"max_total_noise", "type":"number", "sub":"state_defaults" },
                    { "name":"max_duration", "type":"number", "sub":"state_defaults" },
                    { "name":"max_total_duration", "type":"number", "sub":"state_defaults" }
                ];

                // iterating over each property
                for(var i=0; i < propertiesToEdit.length; i++){

                    // retrieve the previous value of the property to edit, if it existed previously
                    if(propertiesToEdit[i].sub){
                        if(context.getData[propertiesToEdit[i].sub]){
                            previousValue = context.getData[propertiesToEdit[i].sub][propertiesToEdit[i].name];
                        }
                    }else{
                        previousValue = context.getData[propertiesToEdit[i].name];
                    }

                    // treat each type of property differently, generating a different input
                    switch(propertiesToEdit[i].type){
                        // in case the type is "text", diplay a <input type="text"> tag
                        case "text":
                            input = "<input "+
                                        "class='custom_swal_input' "+
                                        "type='text' "+
                                        "value='"+ (previousValue || "")+"' "+
                                        "id='input_"+propertiesToEdit[i].name+"' "+
                                    "/>";
                            break;
                        // in case the type is "number", diplay a <input type="number"> tag
                        case "number":
                            input = "<input "+
                                        "class='custom_swal_input' "+
                                        "type='number' "+
                                        "value='"+(previousValue || 0)+"' "+
                                        "id='input_"+propertiesToEdit[i].name+"' "+
                                    "/>";
                            break;
                        // in case the type is "check", diplay a <input type="checkbox"> tag
                        case "check":
                            input = "<input "+
                                        "class='custom_swal_input' "+
                                        "type='checkbox' "+
                                        (previousValue ? "checked='true' " : "")+
                                        "id='input_"+propertiesToEdit[i].name+"' "+
                                    "/>";
                            break;
                        default:
                            input="";
                            break;
                    }

                    // in any case, add a label for the field and wrap it in a <span> tag
                    html += "<span class='swal_display global_display'>"+
                                "<label "+
                                    "class='custom_swal_label' "+
                                    "for='input_"+propertiesToEdit[i].name+"' "+
                                    "id='label_property_"+propertiesToEdit[i].name+"'"+
                                ">"
                                    +propertiesToEdit[i].name+" : "+
                                "</label>"+
                                input+
                            "</span>";
                }

                return html;
            }
        };
        return get_global_edition;
});
