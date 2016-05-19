/**
*   State creation module
*   @module createmode/create_state
*/
define(function(require){
    /**
    *   @constructor
    *   @alias module:createmode/create_state
    *   @param {Object} context - the context of the application (force,svg,getData)
    *   @param {number} x - x-axis coordinates for the new state
    *   @param {number} y - y-axis coordinates for the new state
    */
    var create_state = function(context,x,y){
        var editmode = require("../editmode/edit_init");
        var get_state_edition = require("../editmode/state/get_state_edition");
        var create_circles = require("../viewmode/create_circles");
        var create_state_names = require("../viewmode/create_state_names");

        // referencing the number of nodes - will give us the last id + 1
        var newMaxId = context.force.nodes().length;
        // defining the new state's default properties, thus creating it
        var newState = {
            "name" : "",
            "graphicEditor" : {
                "coordX" : x,
                "coordY" : y
            },
            "x" : x,
            "y" : y,
            "px" : x,
            "py" : y,
            "fixed" : true,
            "uniqueId" : newMaxId,
            "index" : newMaxId
        };

        // add the newly created state to the current node array
        context.force.nodes().push(newState);

        // if there was not any state yet, create an empty container
        if(!context.getData.states){
            context.getData.states = {};
        }
        // push the new state to the global getData.states object
        context.getData.states[newState.name] = newState;

        // recreating svg circle and text elements for states
        create_circles(context.svg,context.force);
        create_state_names(context.svg,context.force);

        //asking automaticly for state properties (edition)
        get_state_edition(d3.select("#state_"+newMaxId).data()[0],context);

        // restarting editmode
        editmode.init(context.svg,context.force,context.getData,context.links);

        //restarting force layout
        context.force.start();
    };
    return create_state;
});
