define(function(require){
    return{
        init: function(context){
            var create_state = require("createmode/create_state"),
                edit_frontend_object = require("editmode/edit_frontend_object");

            var container = d3.select("#object_container_right").append("div").classed("dummy_container",true),
                drag = d3.behavior.drag(),
                posx = 80, posy = 80;

            container.append("p").text("Drag to create a new state");
            container.append("svg")
                .append("circle")
                .attr({
                    "r" : "15",
                    "x" : 80,
                    "y" : 80,
                    "class" : "dummy_create_state",
                    "fill" : "#000",
                    "transform" : "translate("+posx+","+posy+")"
                })
                .call(drag);

            drag.on("drag",function(){
                    d3.select(this).attr("transform",function(){
                        return "translate("+d3.event.x+","+d3.event.y+")";
                    });
                })
                .on("dragend",function(){
                    if(d3.select(d3.event.sourceEvent.target).attr("id") === "svgbox"){
                        //create a new state
                        create_state(context,d3.event.sourceEvent.x,d3.event.sourceEvent.y);
                        edit_frontend_object(context.getData);
                    }
                    d3.select(this).attr("transform",function(){
                        return "translate("+posx+","+posy+")";
                    });
                });
        }
    }
});
