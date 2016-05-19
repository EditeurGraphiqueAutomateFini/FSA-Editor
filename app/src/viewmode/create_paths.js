/**
*   Create path between states
*   @module viewmode/create_paths
*/
define(function(){
    /**
    *   @constructor
    *   @alias module:viewmode/create_paths
    *   @param {Object} container - a D3 element (d3.select) for the container
    *   @returns {Object} force - the generated D3 force layout
    */
    var create_paths = function(container,force){
        var svg = container;

        // create a path for each link/transition
        svg.append("g").classed("path_container",true).selectAll("path")
            .data(force.links()).enter()
            .append("path")
            .attr({
                "class" : "link",
                "id" : function(d){ return "link_"+d.source.index +"_"+d.target.index; },
                "marker-end" : "url(#end)"
            });
    };
    return create_paths;
});
