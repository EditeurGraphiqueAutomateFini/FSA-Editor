define(function(require){
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
