/**
*   Edit name property for a state
*   @module editmode/state/edit_state_name
*/
define(function(){
    /**
    *   @alias module:editmode/state/edit_state_name
    *   @param {Object} d - data for the state, supplied by D3
    *   @param {string} inputValue - the new name property
    *   @param {Object} context - the global application context (svg,force,getData,links)
    */
    var edit_state_name = function(d,inputValue,context){
        var oldName = d.name;

        d.name = inputValue;
        context.getData.states[d.name] = context.getData.states[oldName];
        context.getData.states[oldName] = undefined;
        d3.select("text#state_name_"+d.index+" tspan.state_name_label").html(function(d){
            return d.name;
        });

        // restart force layout w/ new data
        context.force.start();
    };
    return edit_state_name;
});
