/**
*   Edit all properties for a state
*   @module editmode/state/edit_state
*/
define(function(require){
    /**
    *   @alias module:editmode/state/edit_state
    *   @param {Object} newValues - includes newName,newTerminal,newMaxNoise,newMaxTotalNoise,newMaxDuration,newMaxTotalDuration,newDefaultTransition
    *   @param {Object} d - data for the state, supplied by D3
    *   @param {Object} context - the global application context (svg,force,getData,links)
    */
    var edit_state = function(newValues,d,context){
        var edit_references = require("./edit_references");
        var edit_state_defaulttransition = require("./edit_state_defaulttransition");
        var edit_state_maxduration = require("./edit_state_maxduration");
        var edit_state_maxtotalduration = require("./edit_state_maxtotalduration");
        var edit_state_maxnoise = require("./edit_state_maxnoise");
        var edit_state_maxtotalnoise = require("./edit_state_maxtotalnoise");
        var edit_state_name = require("./edit_state_name");
        var edit_state_terminal = require("./edit_state_terminal");

        // edit max_duration if necessary
        if(newValues.newMaxDuration !== d.max_duration){
            edit_state_maxduration(d,newValues.newMaxDuration,context);
        }

        // edit max_noise if necessary
        if(newValues.newMaxNoise !== d.max_noise){
            edit_state_maxnoise(d,newValues.newMaxNoise,context);
        }

        // edit max_total_duration if necessary
        if(newValues.newMaxTotalDuration !== d.max_total_duration){
            edit_state_maxtotalduration(d,newValues.newMaxTotalDuration,context);
        }

        // edit max_total_noise if necessary
        if(newValues.newMaxTotalNoise !== d.max_total_noise){
            edit_state_maxtotalnoise(d,newValues.newMaxTotalNoise,context);
        }

        // edit name if necessary
        if(newValues.newName !== d.name){
            edit_references(context.getData,d.name,newValues.newName);
            edit_state_name(d,newValues.newName,context);
        }

        // edit terminal if necessary
        if(newValues.newTerminal !== d.terminal){
            edit_state_terminal(d,newValues.newTerminal,context);
        }

        // edit default_transition if necessary
        if(newValues.newDefaultTransition){
            // if default_transition is already set
            if(d.default_transition){
                // edit only if default_transition.silent or default_transition.target has changed
                if(
                    newValues.newDefaultTransition.silent !== d.default_transition.silent
                    || newValues.newDefaultTransition.target !== d.default_transition.target
                ){
                    edit_state_defaulttransition(d,newValues.newDefaultTransition.silent,newValues.newDefaultTransition.target,context);
                }
            // if default_transition was not yet set, edit anyways
            }else{
                edit_state_defaulttransition(d,newValues.newDefaultTransition.silent,newValues.newDefaultTransition.target,context);
            }
        }

        // restart force layout w/ new data
        context.force.start();
    };
    return edit_state;
});
