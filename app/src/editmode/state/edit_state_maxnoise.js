/**
*   edit max_noise property for a state
*   @module editmode/state/edit_state_maxnoise - a module that edits a state's max_noise property
*/
define(function(){
    /**
    *   @constructor
    *   @alias module:editmode/state/edit_state_maxnoise
    *   @param {Object} d - data for the state, supplied by D3
    *   @param {number} inputValue - the new max_noise property
    *   @param {Object} context - the global application context (svg,force,getData,links)
    */
    return function(d,inputValue,context){
        d.max_noise = inputValue;
        context.getData.states[d.name].max_noise = parseInt(inputValue) || 0;
        d3.select("text#state_name_"+d.index+" tspan.state_name_maxnoise").html(function(d){
          return d.max_noise > 0 ? "["+d.max_noise+"]" : "";
        });

        // restart force layout w/ new data
        context.force.start();
    };
});
