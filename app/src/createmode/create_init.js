/**
*   Creation module
*   @module createmode/create_init
*/
define(function(require){
    return {
        /**
        *   Initialisation function
        *   @param {Object} context - the context of the application (force,svg,getData)
        */
        init: function(context){
            var create_state = require("./create_state");
            var edit_frontend_object = require("../editmode/edit_frontend_object");
            var get_global_edition = require("../editmode/global/get_global_edition");

            // if the set of state is empty, launch edition of global properties
            // in order to create a new JS object for the automaton
            if(context.getData.length === 0){
                get_global_edition(context);
            }

            // append a container for the dummy state
            var container = d3.select("#object_container_right").append("div").classed("dummy_container",true);
            // reference the drag behavior
            var drag = d3.behavior.drag();
            // set position x and y
            var posx = 80;
            var posy = 80;

            // append a title to the dummy state's container
            container.append("p").text("Drag to create a new state");
            // create the dummy state
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

            // define drag function (translate element's new position)
            drag.on("drag",function(){
                    d3.select(this).attr("transform",function(){
                        return "translate("+d3.event.x+","+d3.event.y+")";
                    });
                })
            //define dragend function
                .on("dragend",function(){
                    if(d3.select(d3.event.sourceEvent.target).attr("id") === "svgbox"){
                        //create a new state if the dummy state is dragged on the main frame ("svgbox")
                        create_state(context,d3.event.sourceEvent.x,d3.event.sourceEvent.y);
                        edit_frontend_object(context.getData);
                    }
                    // another translate function to set the right destination position
                    d3.select(this).attr("transform",function(){
                        return "translate("+posx+","+posy+")";
                    });
                });
        }
    };
});
