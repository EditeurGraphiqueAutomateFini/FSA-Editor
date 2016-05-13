/**
*   Sweetalert prompt for global state properties edition
*   @module editmode/state/get_state_edition
*/
define(function(require){
    /**
    *   @constructor
    *   @alias module:editmode/state/get_state_edition
    *   @param {Object} d - data for the state, supplied by D3
    *   @param {Object} context - the global application context (svg,force,getData,links)
    */
    return function (d,context){
        var edit_state = require("./edit_state");
        var delete_state = require("./delete_state");
        var cancel_selection = require("../cancel_selection");
        var undo = require("../../utility/undo");
        var edit_frontend_object = require("../edit_frontend_object");

        swal({
            title : (d.name ? d.name : "New state"),
            text : displayStateAsList(d),
            html : true,
            showCancelButton : true,
            closeOnConfirm : false,
            animation : "slide-from-top"
        },function(inputValue){
            // on submit
            if(inputValue){
                var newName = "";
                var newTerminal = false;
                var newMaxNoise = 0;
                var newMaxTotalNoise = 0;
                var newMaxDuration = 0;
                var newMaxTotalDuration = 0;
                var newValues;
                var newDefaultTransition = {
                    "condition":"",
                    "target":0
                };

                // name
                newName = d3.select("#input_name_"+d.index).property("value");
                // terminal
                newTerminal = d3.select("#input_terminal_"+d.index).property("checked");
                // max_noise
                newMaxNoise = parseInt(d3.select("#input_max_noise_"+d.index).property("value"));
                // max_total_noise
                newMaxTotalNoise = parseInt(d3.select("#input_max_total_noise_"+d.index).property("value"));
                // max_duration
                newMaxDuration = parseInt(d3.select("#input_max_duration_"+d.index).property("value"));
                // max_total_duration
                newMaxTotalDuration = parseInt(d3.select("#input_max_total_duration_"+d.index).property("value"));
                // default_transition
                newDefaultTransition.silent = d3.select("#input_default_transition_silent_"+d.index).property("checked");
                newDefaultTransition.target = d3.select("#input_default_transition_target_"+d.index).property("value");

                // error : the name is empty
                if(newName === ""){
                    swal.showInputError("a state must have a name");
                    return false;
                }
                // error : max_noise is negative
                if(newMaxNoise < 0){
                    swal.showInputError("max_noise cannot be negative");
                    return false;
                }
                // error : max_noise is above max_total_noise
                if(newMaxNoise > newMaxTotalNoise){
                    swal.showInputError("max_noise cannot be > max_total_noise");
                    return false;
                }
                // error : max_total_noise is negative
                if(newMaxTotalNoise < 0){
                    swal.showInputError("max_total_noise cannot be negative");
                    return false;
                }
                // error : max_duration is negative
                if(newMaxDuration < 0){
                    swal.showInputError("max_duration cannot be negative");
                    return false;
                }
                // error : max_duration is above max_total_duration
                if(newMaxDuration > newMaxTotalDuration){
                    swal.showInputError("max_duration cannot be > max_total_duration");
                    return false;
                }
                // error : max_total_duration is negative
                if(newMaxTotalDuration < 0){
                    swal.showInputError("max_total_duration cannot be negative");
                    return false;
                }

                // error : max noise cannot be set together with default_transition
                if(
                    parseInt(d3.select("[id^=input_max_noise_]").property("value")) > 0
                    && parseInt(d3.select("[id^=input_default_transition_target_]").property("selectedIndex")) > 0
                ){
                    swal.showInputError("max_noise cannot be set with default_transition");
                    return false;
                }

                // check if name already exists
                for(var state in context.getData.states){
                    if(context.getData.states.hasOwnProperty(state) && context.getData.states[state]){
                        // error : the name already exists
                        if(newName === context.getData.states[state].name && context.getData.states[state].index !== d.index){
                            swal.showInputError("A state with this name already exists");
                            return false;
                        }
                    }
                }

                // aggregating new values in a single object
                newValues = {
                    "newName":newName,
                    "newTerminal":newTerminal,
                    "newMaxNoise":newMaxNoise,
                    "newMaxTotalNoise":newMaxTotalNoise,
                    "newMaxDuration":newMaxDuration,
                    "newMaxTotalDuration":newMaxTotalDuration,
                    "newDefaultTransition":newDefaultTransition
                };

                // edit state
                edit_state(newValues,d,context);

                // do front-end work
                cancel_selection(d);
                edit_frontend_object(context.getData);
                undo.addToStack(context.getData);

                // close sweetalert prompt window
                swal.close();
            // on cancel
            }else if(inputValue === false){
                cancel_selection(d);

                // if the state was being created, delete it
                if(d.name === ""){
                    delete_state(d,context);

                    // edit fe object
                    edit_frontend_object(context.getData);
                    undo.addToStack(context.getData);
                }
                return false;
            // this should never happen
            }else if(inputValue === ""){
                swal.showInputError("error");
                return false;
            }
        });

        /**
        *   display form with properties list - iterates over each propertie to return a complete form for the sweetalert prompt
        *   @return {string} html - the complete html form for the sweetalert prompt of global state properties
        */
        function displayStateAsList(d){
            var html = "";
            var currentState = context.getData.states[d.name];
            var input = "";
            // defining each property to edit with a name and a type
            var propertiesToEdit = [
                { "name":"name", "type":"text" },
                { "name":"terminal", "type":"check" },
                { "name":"max_noise", "type":"number" },
                { "name":"max_total_noise", "type":"number" },
                { "name":"max_duration", "type":"number" },
                { "name":"max_total_duration", "type":"number" },
                { "name":"default_transition", "type":"transition" }
            ];
            var options = "";
            var hasSelection = false;
            var state;
            var isSilent = false;

            // iterating over each property
            for(var i=0; i < propertiesToEdit.length; i++){

                // treat each type of property differently, generating a different input
                switch(propertiesToEdit[i].type){
                    // in case the type is "text", diplay a <input type="text"> tag
                    case "text":
                        input = "<input "+
                                    "class='custom_swal_input' "+
                                    "type='text' "+
                                    "value='"+(currentState[propertiesToEdit[i].name] || "")+"' "+
                                    "id='input_"+propertiesToEdit[i].name+"_"+d.index+"' "+
                                "/>";
                        break;
                    // in case the type is "number", diplay a <input type="number"> tag
                    case "number":
                        input = "<input "+
                                    "class='custom_swal_input' "+
                                    "type='number' "+
                                    "value='"+(currentState[propertiesToEdit[i].name] || 0)+"' "+
                                    "id='input_"+propertiesToEdit[i].name+"_"+d.index+"' "+
                                "/>";
                        break;
                    // in case the type is "check", diplay a <input type="checkbox"> tag
                    case "check":
                        input = "<input "+
                                    "class='custom_swal_input' "+
                                    "type='checkbox' "+
                                    (currentState[propertiesToEdit[i].name] ? "checked='true' " : "")+
                                    "id='input_"+propertiesToEdit[i].name+"_"+d.index+"' "+
                                "/>";
                        break;
                    // in case the type is "transition", diplay a <select> tag with an <option> tag for each state
                    case "transition":
                        // default values
                        options = "";
                        hasSelection = false;
                        isSilent = false;

                        // iterating over each state
                        for(state in context.getData.states){
                            if(context.getData.states.hasOwnProperty(state) && context.getData.states[state] !== undefined){
                                // retrieve the id of the current transition's target
                                if(currentState[propertiesToEdit[i].name] !== undefined && currentState[propertiesToEdit[i].name].target == context.getData.states[state].name){
                                    hasSelection = context.getData.states[state].index;
                                }
                                // generate an option for the state, checking if it was selected or not
                                options += "<option "+
                                                (hasSelection === context.getData.states[state].index ? "selected='true'" : "")+
                                                "value='"+context.getData.states[state].index+
                                            "'>"+
                                                state+
                                            "</option>";
                            }
                         }

                         // retrieve silent property
                         if(currentState[propertiesToEdit[i].name]){
                             isSilent = currentState[propertiesToEdit[i].name].silent;
                         }else{
                             isSilent = false;
                         }

                        input = "<span class='swal_select_container'>"+
                                    "<span class='swal_select_subcontainer'>"+
                                        "<select "+
                                            "class='custom_swal_select' "+
                                            "id='input_"+propertiesToEdit[i].name+"_target_"+d.index+"' "+
                                        ">"+
                                            "<option "+(hasSelection ? "" : "selected='true'")+" value=''>Select a target</option>"+
                                            options +
                                        "</select>"+
                                    "</span>"+
                                    "<span class='swal_select_subcontainer'>"+
                                        "<span class='sub_label'>silent : </span>"+
                                        "<input "+
                                            "class='custom_swal_input' "+
                                            "type='checkbox' "+
                                            (isSilent ? "checked='true' " : "")+
                                            "id='input_"+propertiesToEdit[i].name+"_silent_"+d.index+"' "+
                                        "/>"+
                                    "</span>"+
                                "</span>";

                        break;
                    default:
                        input = "";
                        break;
                }

                // in any case, add a label for the field and wrap it in a <span> tag
                html += "<span class='swal_display state_display state_display_"+d.index+"'>"+
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
    };
});
