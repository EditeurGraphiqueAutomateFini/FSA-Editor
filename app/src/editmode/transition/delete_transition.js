/**
*   Delete one or more transition
*   @module editmode/transition/delete_transition
*/
define(function(){
    /**
    *   @alias module:editmode/transition/delete_transition
    *   @param {Object} d - data for the link, supplied by D3
    *   @param {array} conditionsToDelete - an array containing the condition indexes to delete
    *   @param {Object} context - the global application context (svg,force,getData,links)
    */
    var delete_transition = function(d,conditionsToDelete,context){
        var condition_list = require("../../viewmode/condition_list");

        var states = context.getData.states;
        var indexesToDelete = [];
        var indexToDelete;
        var i = 0;
        var j = 0;

        // delete transitions in global object
        for(var state in states){
            if(states.hasOwnProperty(state) && states[state]){
                if(states[state].index === d.source.index){
                    if(states[state].transitions){
                        states[state].transitions.forEach(function(object,index){
                            conditionsToDelete.forEach(function(condition){
                                if(object.condition === d.conditions[condition].condition && object.target === d.target.name){
                                    indexesToDelete.push(index);
                                }
                            });
                        });
                        for(i=0; i < indexesToDelete.length; i++){
                            states[state].transitions.splice(indexesToDelete[i],1);
                            for(j=0; j < indexesToDelete.length; j++) indexesToDelete[j]--;
                        }
                    }
                }
            }
        }

        // delete in d3 links
        if(d.conditions){
            for(i=0; i < conditionsToDelete.length; i++){
                d.conditions.splice(conditionsToDelete[i],1);
                for(j=0; j < conditionsToDelete.length; j++) conditionsToDelete[j]--;
            }
        }

        // edit html
        d3.selectAll(".condition.link_"+d.source.index+"_"+d.target.index)
            .text(condition_list);

        // checking if no conditions remaining. If so, delete link
        if(d.conditions){
            if(d.conditions.length === 0){
                d3.selectAll(".link_"+d.source.index+"_"+d.target.index).remove();
                d3.select("#link_"+d.source.index+"_"+d.target.index).remove();
                context.force.links().forEach(function(link,index){
                    if(link.source.index === d.source.index && link.target.index === d.target.index){
                        indexToDelete = index;
                    }
                });
                context.force.links().splice(indexToDelete,1);
            }
        }

        // restarting force w/ new nodes and links
        context.force.start();
    };
    return delete_transition;
});
