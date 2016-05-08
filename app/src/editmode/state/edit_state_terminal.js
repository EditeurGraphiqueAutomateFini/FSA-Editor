/**
*   edit terminal property for a state
*   @module editmode/state/edit_state_terminal - a module that edits a state's terminal property
*/
define(function(){
    /**
    *   @constructor
    *   @alias module:editmode/state/edit_state_terminal
    *   @param {Object} d - data for the state, supplied by D3
    *   @param {boolean} newTerminal - the new terminal property
    *   @param {Object} context - the global application context (svg,force,getData,links)
    */
    return function(d,newTerminal,context){
        d.terminal = newTerminal;
        context.getData.states[d.name].terminal = newTerminal;
        d3.select("circle#state_"+d.index).classed("terminal",function(){
            return d.terminal;
        });
    };
});
