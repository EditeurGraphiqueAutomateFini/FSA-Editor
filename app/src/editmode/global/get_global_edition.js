define(function(require){

        //global properties editing
        return function(context){
            var edit_global = require("editmode/global/edit_global"),
                undo = require("utility/undo"),
                edit_frontend_object = require("editmode/edit_frontend_object");

            var swalGlobalEdition = swal({
                title: "Edit global properties",
                text: displayGlobalPropertiesAsList(),
                html: true,
                showCancelButton: true,
                closeOnConfirm: false,
                animation: "slide-from-top"
            },function(inputValue){
                    if(inputValue){
                        var newOverlap = false,
                            newDefaultMatcher = "",
                            newTerminal = false,
                            newMaxNoise = 0,
                            newMaxTotalNoise = 0,
                            newMaxDuration = 0,
                            newMaxTotalDuration = 0;

                        //overlap
                        newOverlap = d3.select("#input_allow_overlap").property("checked");
                        //default_matcher
                        newDefaultMatcher = d3.select("#input_default_matcher").property("value");
                        //terminal
                        newTerminal = d3.select("#input_terminal").property("checked");
                        //max_noise
                        newMaxNoise = parseInt(d3.select("#input_max_noise").property("value"));
                        //max_total_noise
                        newMaxTotalNoise = parseInt(d3.select("#input_max_total_noise").property("value"));
                        //max_duration
                        newMaxDuration = parseInt(d3.select("#input_max_duration").property("value"));
                        //max_total_duration
                        newMaxTotalDuration = parseInt(d3.select("#input_max_total_duration").property("value"));

                        //tests
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

                        //values assignment
                        var newValues = {
                            "newOverlap":newOverlap,
                            "newDefaultMatcher":newDefaultMatcher,
                            "newTerminal":newTerminal,
                            "newMaxNoise":newMaxNoise,
                            "newMaxTotalNoise":newMaxTotalNoise,
                            "newMaxDuration":newMaxDuration,
                            "newMaxTotalDuration":newMaxTotalDuration
                        }

                        edit_global(newValues,context);

                        edit_frontend_object(context.getData);
                        undo.addToStack(context.getData);
                        swal.close();   //close sweetalert prompt window
                    }else if(inputValue===false){  //cancel
                        return false;
                    }else if(inputValue===""){
                        swal.showInputError("error");
                        return false;
                    }
            });

            //display form with properties list
            function displayGlobalPropertiesAsList(){
                var html = "",
                    input="",
                    propertiesToEdit=[
                        { "name":"allow_overlap", "type":"check" },
                        { "name":"default_matcher", "type":"text" },
                        { "name":"state_defaults", "type":"" },
                        { "name":"terminal", "type":"check", "sub":"state_defaults" },
                        { "name":"max_noise", "type":"number", "sub":"state_defaults" },
                        { "name":"max_total_noise", "type":"number", "sub":"state_defaults" },
                        { "name":"max_duration", "type":"number", "sub":"state_defaults" },
                        { "name":"max_total_duration", "type":"number", "sub":"state_defaults" }
                    ];

                var previousValue;

                for(var i=0;i<propertiesToEdit.length;i++){

                    if(propertiesToEdit[i].sub){
                        previousValue = context.getData[propertiesToEdit[i].sub][propertiesToEdit[i].name];
                    }else{
                        previousValue = context.getData[propertiesToEdit[i].name];
                    }

                    switch(propertiesToEdit[i].type){
                        case "text":
                            input = "<input "+
                                        "class='custom_swal_input' "+
                                        "type='text' "+
                                        "value='"+ (previousValue || "")+"' "+
                                        "id='input_"+propertiesToEdit[i].name+"' "+
                                    "/>"
                            break;
                        case "number":
                            input = "<input "+
                                        "class='custom_swal_input' "+
                                        "type='number' "+
                                        "value='"+(previousValue || 0)+"' "+
                                        "id='input_"+propertiesToEdit[i].name+"' "+
                                    "/>"
                            break;
                        case "check":
                            input = "<input "+
                                        "class='custom_swal_input' "+
                                        "type='checkbox' "+
                                        (previousValue ? "checked='true' " : "")+
                                        "id='input_"+propertiesToEdit[i].name+"' "+
                                    "/>"
                            break;
                        default:
                            input="";
                            break;
                    }
                    html+="<span class='swal_display global_display'>"+
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
        }
});
