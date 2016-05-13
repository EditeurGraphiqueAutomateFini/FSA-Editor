/**
*   Edit max_duration property for a state
*   @module editmode/state/edit_state_maxduration
*/
define(function(){
    /**
    *   @constructor
    *   @alias module:editmode/state/edit_state_maxduration
    *   @param {Object} d - data for the state, supplied by D3
    *   @param {number} newMaxDuration - the new max_duration property
    *   @param {Object} context - the global application context (svg,force,getData,links)
    */
    return function(d,newMaxDuration,context){
        d.max_duration = newMaxDuration;
        if(context.getData.states[d.name]){
            context.getData.states[d.name].max_duration = parseInt(newMaxDuration) || 0;
        }
    };
});
