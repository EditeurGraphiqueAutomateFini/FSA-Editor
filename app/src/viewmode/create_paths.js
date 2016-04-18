// create path between states : container : html container /!\D3/!\ selector, states : array of states, links : links array created w/ data array
define(function(){
    return function(container,force){

        var svg = container;

        // create a path for each link/transition
        var path = svg.append("g").classed("path_container",true).selectAll("path")
            .data(force.links()).enter()
            .append("path")
            .attr({
                "class" : "link",
                "id" : function(d){ return "link_"+d.source.index +"_"+d.target.index; },
                "marker-end" : "url(#end)"
            });

    }
});
