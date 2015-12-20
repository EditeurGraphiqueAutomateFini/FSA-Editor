//create d3 force layout
define(function(require){
    return function(container,states,links){
        var tick = require("viewmode/tick_helper");

        //creating the force layout with states as nodes
        var force = d3.layout.force()
            .nodes(d3.values(states))
            .links(d3.values(links))
            .size(function(){
                container.each(function(){return [this.clientWidth,this.clientHeight]});
            })
            .linkDistance(200)
            .charge(-200)
            .on("tick",tick)
            .start();

        var drag = force.drag().on("dragstart", function(){
            var objectContainer = $("#object_container_left");
            if(!(objectContainer.css("background")==="orange")){
                objectContainer.css("background","orange");
            }
        });

        return force;

    }
});
