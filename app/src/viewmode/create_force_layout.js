// create d3 force layout
define(function(require){
    return function(container,states,links){

        var $ = require("jquery");
        var tick = require("./tick_helper");

        var containmentWidth = $("#svgbox")[0].getBoundingClientRect().width,
            containmentHeight = $("#svgbox")[0].getBoundingClientRect().height;

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
