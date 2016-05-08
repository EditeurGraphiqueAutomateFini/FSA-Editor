/**
*   create conditions for links
*   @module viewmode/create_conditions - a module to create conditions for links
*/
define(function(require){
    /**
    *   @constructor
    *   @alias module:viewmode/create_conditions
    *   @param {Object} container - a D3 element (d3.select) for the container
    *   @param {Object} force - the D3 force layout
    */
    return function(container,force){
        var condition_list = require("./condition_list");
        var position_condition = require("./position_condition");

        var svg = container;

        // create a text for each transition w/ the condition of the transition
        svg.append("g").classed("condition_container",true).selectAll("text")
            .data(force.links()).enter()
            .append("text")
            .attr({
                "x" : position_condition.setXPosition,
                "y" : position_condition.setYPosition,
                "class" : function(d){
                    return "condition link_"+d.source.index +"_"+d.target.index;
                }
            })
            .text(condition_list);
    };
});
