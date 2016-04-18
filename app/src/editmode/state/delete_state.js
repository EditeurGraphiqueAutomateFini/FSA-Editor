define(function(){
    // delete a state having index == elementIndex
    // "context" parameter is containing "svg" object, "getData" original datas, "force" d3 current force layout object
    // makes global data sendable to the server
    return function(elementIndex,context){
        var states = context.getData.states,
            delete_link_id = [],
            delete_node_id = [],
            sourceIndex,targetIndex,
            i = 0, j = 0;

        // delete links w/ source or target pointing at elementIndex
        context.force.links().forEach(function(el,ind){
            if(el.source.index == elementIndex || el.target.index == elementIndex){
                delete_link_id.push(ind);
            }
        });
        for(i=0; i < delete_link_id.length; i++){
            context.force.links().splice(delete_link_id[i],1);
            for(j=0; j < delete_link_id.length; j++) delete_link_id[j]--;
        }
        // suppress node at index elementIndex
        context.force.nodes().forEach(function(el,ind){
            if(el.index == elementIndex){
                delete_node_id.push(ind);
                d3.select("#state_"+elementIndex).remove();
            }
        });
        for(i=0; i < delete_node_id.length; i++){
            context.force.nodes().splice(delete_node_id[i],1);
            for(j=0; j < delete_node_id.length; j++) delete_node_id[j]--;
        }
        // delete state name
        d3.select("#state_name_"+elementIndex).remove();
        // delete links w/ target or source set to the element
        d3.selectAll("path.link").each(function(d){
            sourceIndex = d.source.index;
            targetIndex = d.target.index;

            // delete link and condition
            if(sourceIndex == elementIndex || targetIndex == elementIndex){
                d3.selectAll(
                    "path.link[id$='_"+elementIndex+"'],path.link[id^='link_"+elementIndex+"_']"
                ).remove();
                d3.selectAll(
                    "text.condition[class$='_"+elementIndex+"'],text.condition[class*='link_"+elementIndex+"_']"
                ).remove();
            }
        });
        // deleting state
        for(var key in states){
            if(states.hasOwnProperty(key) && states[key]){
                if(states[key].index == elementIndex){
                    states[key] = undefined;
                }
            }
        }
        // restarting force w/ new nodes and links
        context.force.start();
        // editing classes and ids on svg elements which index was modified
        d3.selectAll("circle").attr("id",function(d){ return "state_"+d.index; });
        d3.selectAll("text.state_name").attr("id",function(d){ return "state_name_"+d.index; });
        d3.selectAll("path.link").attr("id",function(d){ return "link_"+d.source.index+"_"+d.target.index; });
        d3.selectAll("text.condition").attr("class",function(d){ return "condition "+"link_"+d.source.index+"_"+d.target.index; });
    }
});
