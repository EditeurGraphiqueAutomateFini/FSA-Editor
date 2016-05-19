/**
*   Edit a condition
*   @module editmode/transition/edit_condition
*/
define(function(){
    /**
    *   @alias module:editmode/transition/edit_condition
    *   @param {array} svg - a D3.select svg element
    *   @param {Object} force - current D3 force layout
    *   @param {number} sourceID - the id of the source state
    *   @param {number} targetID - the id of the target state
    *   @param {string} condition - the new condition
    *   @param {string} [isNew] - a string === "new" if the transition does not already exist (optional)
    */
    var edit_condition = function(svg,force,sourceID,targetID,condition,isNew){
        var condition_list = require("../../viewmode/condition_list");
        var position_condition = require("../../viewmode/position_condition");

        // create new transition (path+text)
        if(isNew === "new"){
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
                    "x" : position_condition.setXPosition,
                    "y" : position_condition.setYPosition,
                    "class" : function(){ return "condition link_"+sourceID +"_"+targetID+" new_link"; }
                })
                .text(condition_list);
        // simply render the new condition (transition already exists) (only text)
        }else{
            svg.select(".condition.link_"+sourceID+"_"+targetID)
                .text(condition_list)
                .classed("new_condition",true);
        }

        // restart force layout w/ new data
        force.start();
    };
    return edit_condition;
});
