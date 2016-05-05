define(function(require){
    return function(container,force){
        var condition_list = require("./condition_list");
        var svg = container;

        // create a text for each transition w/ the condition of the transition
        svg.append("g").classed("condition_container",true).selectAll("text")
            .data(force.links()).enter()
            .append("text")
            .attr({
                "x" : function(d){ return (d.source === d.target ? 20 : Math.round((d.target.y - d.source.y) * (0.2))); },
                "y" : function(d){ return (d.source === d.target ? 0 : Math.round((d.target.x - d.source.x) * (-0.2))); },
                "class" : function(d){
                    return "condition link_"+d.source.index +"_"+d.target.index;
                }
            })
            .text(condition_list);

    };
});
