/**
*   Edit global automaton properties
*   @module editmode/global/edit_global
*   @param {Object} newValues - a key:value object with new properties (keys are "newDefaultMatcher", "newMaxDuration", "newMaxNoise", "newMaxTotalDuration", "newMaxTotalNoise", "newOverlap", "newTerminal"
*   @param {Object} context - the global application context (svg,force,getData,links)
*/
define(function(){
    /**
    *   @alias module:editmode/global/edit_global
    */
    var edit_global = function(newValues,context){

        // edit allow_overlap
        context.getData.allow_overlap = newValues.newOverlap;

        // edit default_matcher
        context.getData.default_matcher = newValues.newDefaultMatcher;

        // if a state_defaults property is defined
        if(context.getData.state_defaults){
            // edit terminal
            context.getData.state_defaults.terminal = newValues.newTerminal;

            // edit max_noise
            if( newValues.newMaxNoise >= 0 ){
                context.getData.state_defaults.max_noise = parseInt(newValues.newMaxNoise) || 0;
            }else{
                context.getData.state_defaults.max_noise = undefined;
            }

            // edit max_total_noise
            if( newValues.newMaxTotalNoise >= 0){
                context.getData.state_defaults.max_total_noise = parseInt(newValues.newMaxTotalNoise) || 0;
            }else{
                context.getData.state_defaults.max_total_noise = undefined;
            }

            // edit max_duration
            if( newValues.newMaxDuration >= 0 ){
                context.getData.state_defaults.max_duration = parseInt(newValues.newMaxDuration) || 0;
            }else{
                context.getData.state_defaults.max_duration = undefined;
            }

            // edit max_total_duration
            if( newValues.newMaxTotalDuration >= 0 ){
                context.getData.state_defaults.max_total_duration = parseInt(newValues.newMaxTotalDuration) || 0;
            }else{
                context.getData.state_defaults.max_total_duration = undefined;
            }

        // if a state_defaults property is not defined, we create it
        }else{
            context.getData.state_defaults = {
                "terminal" : newValues.newTerminal,
                "max_noise" : newValues.newMaxNoise,
                "max_total_noise" : newValues.newMaxTotalNoise,
                "max_duration" : newValues.newMaxDuration,
                "max_total_duration" : newValues.newMaxTotalDuration
            };
        }
    };
    return edit_global;
});
