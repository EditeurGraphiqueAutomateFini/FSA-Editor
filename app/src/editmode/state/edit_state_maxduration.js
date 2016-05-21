/**
*   Edit max_duration property for a state
*   @module editmode/state/edit_state_maxduration
*   @param {Object} d - data for the state, supplied by D3
*   @param {number} newMaxDuration - the new max_duration property
*   @param {Object} context - the global application context (svg,force,getData,links)
*/
define(function(){
    /**
    *   @alias module:editmode/state/edit_state_maxduration
    */
    var edit_state_maxduration = function(d,newMaxDuration,context){
        if(newMaxDuration >= 0){
            d.max_duration = newMaxDuration;
            if(context.getData.states[d.name]){
                context.getData.states[d.name].max_duration = newMaxDuration;
            }
        }else{
            d.max_duration = undefined;
            if(context.getData.states[d.name]){
                context.getData.states[d.name].max_duration = undefined;
            }
        }
    };
    return edit_state_maxduration;
});
