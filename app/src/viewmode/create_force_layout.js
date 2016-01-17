//create d3 force layout
define(function(require){
    return function(container,states,links,getData){
        var tick = require("viewmode/tick_helper"),
            utility = require("utility/utility"),
            data_helper = require("viewmode/data_helper");

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

        //add a modification of the frond-end displayed data on drag
        var drag = force.drag()
            .on("dragstart", function(){
                var objectContainer = $("#object_container_left");
                if(!(objectContainer.css("background")==="#f5e79e")){
                    objectContainer.css("background","#f5e79e");
                }
            })
            .on("drag",function(d){
            })
            .on("dragend",function(){
                var displayableData = data_helper.cleanData(getData);
                utility.frontEndObject([displayableData]);
            });

        return force;

    }
});
