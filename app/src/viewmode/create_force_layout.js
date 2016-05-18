/**
*   Create D3 force layout
*   @module viewmode/create_force_layout
*/
define(function(require){
    /**
    *   @constructor
    *   @alias module:viewmode/create_force_layout
    *   @param {Object} container - a D3 element (d3.select) for the container
    *   @param {Object} states - the object containing the states
    *   @param {Object} links - the object containing the transitions
    *   @returns {Object} force - the generated D3 force layout
    */
    return function(container,states,links,options){
        var tick = require("./tick_helper");

        var containmentWidth = options.width || $("#svgbox")[0].getBoundingClientRect().width,
            containmentHeight = options.height || $("#svgbox")[0].getBoundingClientRect().height;

        // creating the force layout with states as nodes
        var force = d3.layout.force()
            .nodes(d3.values(states))
            .links(d3.values(links))
            .size(function(){
                container.each(function(){ return [this.clientWidth,this.clientHeight]; });
            })
            .linkDistance(200)
            .charge(-200)
            .on("tick",function(e){
                var r = 15;
                tick(e,r,containmentWidth,containmentHeight);
            })
            .start();

        return force;

    };
});
