/**
*   delete a state
*   @module editmode/state/delete_state - delete a state having a given index
*/
define(function(require){
    /**
    *   @constructor
    *   @alias module:editmode/state/delete_state
    *   @param {Object} d - data for the state, supplied by D3
    *   @param {Object} context - "context" parameter is containing "svg" object, "getData" original datas, "force" d3 current force layout object
    */
    return function(d,context){
        var delete_references = require("./delete_references");

        var states = context.getData.states;
        var delete_link_id = [];
        var delete_node_id = [];
        var sourceIndex;
        var targetIndex;
        var i = 0;
        var j = 0;

        // delete links w/ source or target pointing at d.index
        context.force.links().forEach(function(el,ind){
            if(el.source.index == d.index || el.target.index == d.index){
                delete_link_id.push(ind);
            }
        });
        for(i = 0; i < delete_link_id.length; i++){
            context.force.links().splice(delete_link_id[i],1);
            for(j = 0; j < delete_link_id.length; j++) delete_link_id[j]--;
        }

        // suppress node at index d.index
        context.force.nodes().forEach(function(el,ind){
            if(el.index == d.index){
                delete_node_id.push(ind);
                d3.select("#state_"+d.index).remove();
            }
        });
        for(i = 0; i < delete_node_id.length; i++){
            context.force.nodes().splice(delete_node_id[i],1);
            for(j = 0; j < delete_node_id.length; j++) delete_node_id[j]--;
        }

        // delete state name
        d3.select("#state_name_"+d.index).remove();

        // delete links w/ target or source set to the element
        d3.selectAll("path.link").each(function(data){
            sourceIndex = data.source.index;
            targetIndex = data.target.index;

            // delete link and condition
            if(sourceIndex == d.index || targetIndex == d.index){
                d3.selectAll(
                    "path.link[id$='_"+d.index+"'],path.link[id^='link_"+d.index+"_']"
                ).remove();
                d3.selectAll(
                    "text.condition[class$='_"+d.index+"'],text.condition[class*='link_"+d.index+"_']"
                ).remove();
            }
        });

        // deleting state
        for(var key in states){
            if(states.hasOwnProperty(key) && states[key]){
                if(states[key].index == d.index){
                    states[key] = undefined;
                }
            }
        }

        // restarting force w/ new nodes and links
        context.force.start();

        // editing classes and ids on svg elements which index was modified
        d3.selectAll(".state_container circle").attr("id",function(data){ return "state_"+data.index; });
        d3.selectAll("text.state_name").attr("id",function(data){ return "state_name_"+data.index; });
        d3.selectAll("path.link").attr("id",function(data){ return "link_"+data.source.index+"_"+data.target.index; });
        d3.selectAll("text.condition").attr("class",function(data){ return "condition "+"link_"+data.source.index+"_"+data.target.index; });

        // delete references
        delete_references(context.getData,d.name);
    };
});
