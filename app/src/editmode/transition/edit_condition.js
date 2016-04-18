define(function(){
    // create a link between two states
    return function(svg,force,sourceID,targetID,condition,isNew){

        var condition_list = require("viewmode/condition_list");

        if(isNew === "new"){    // create new transition (path+text)
            // adding a path for the newly created link
            svg.select("g.path_container").selectAll("path")
                .data(force.links()).enter()
                .append("path")
                .attr({
                    "class" : "link new_link",
                    "id" : function(){ return "link_"+sourceID +"_"+targetID; },
                    "marker-end" : "url(#end)"
                });
            // adding a condition text for the newly created link
            svg.select("g.condition_container").selectAll("text")
                .data(force.links()).enter()
                .append("text")
                .attr({
                    "x" : 20,
                    "y" : 0,
                    "class" : function(){ return "condition link_"+sourceID +"_"+targetID+" new_link"; }
                })
                .text(condition_list);
        }else{  // simply render the new condition (transition already exists) (only text)

            svg.select(".condition.link_"+sourceID+"_"+targetID)
                .text(condition_list)
                .classed("new_condition",true);
        }

        // restart force layout w/ new data
        force.start();
    }
});
