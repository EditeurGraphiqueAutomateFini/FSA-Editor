/**
*   Edit max_total_noise property for a state
*   @module editmode/state/edit_state_maxtotalnoise
*/
define(function(){
    /**
    *   @alias module:editmode/state/edit_state_maxtotalnoise
    *   @param {Object} d - data for the state, supplied by D3
    *   @param {number} newMaxTotalNoise - the new max_total_noise property
    *   @param {Object} context - the global application context (svg,force,getData,links)
    */
    var edit_state_maxtotalnoise = function(d,newMaxTotalNoise,context){
        d.max_total_noise = newMaxTotalNoise;
        if(context.getData.states[d.name]){
            context.getData.states[d.name].max_total_noise = parseInt(newMaxTotalNoise) || 0;
        }
    };
    return edit_state_maxtotalnoise;
});
