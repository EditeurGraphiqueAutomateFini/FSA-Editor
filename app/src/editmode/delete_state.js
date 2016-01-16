define(function(){
    //delete a state having index == elementIndex
    //"context" parameter is containing "svg" object, "getData" original datas, "force" d3 current force layout object
    //makes global data sendable to the server
    return function(elementIndex,context){
        var states = context.getData.states,
            delete_link_id=[],
            delete_node_id=[];
        //delete links w/ source or target pointing at elementIndex
        context.force.links().forEach(function(el,i,arr){
            if(el.source.index==elementIndex || el.target.index==elementIndex){
                delete_link_id.push(i);
            }
        });
        for(var i=0;i<delete_link_id.length;i++){
            context.force.links().splice(delete_link_id[i],1);
            for(var j=0;j<delete_link_id.length;j++) delete_link_id[j]--;
        }
        //suppress node at index elementIndex
        context.force.nodes().forEach(function(el,i,arr){
            if(el.index==elementIndex){
                delete_node_id.push(i);
                d3.select("#state_"+elementIndex).remove();
            }
        });
        for(var i=0;i<delete_node_id.length;i++){
            context.force.nodes().splice(delete_node_id[i],1);
            for(var j=0;j<delete_node_id.length;j++) delete_node_id[j]--;
        }
        //delete state name
        d3.select(".state_name_"+elementIndex).remove();
        //delete links w/ target or source set to the element
        d3.selectAll("path.link").each(function(){
            if(d3.select(this).data()[0]){
                var sourceIndex = d3.select(this).data()[0].source.index,
                    targetIndex = d3.select(this).data()[0].target.index,
                    linkClass=d3.select(this).attr("class").slice(5);
                if(sourceIndex == elementIndex || targetIndex == elementIndex){
                    d3.selectAll("."+linkClass).remove();
                }
            }
        });
        //deleting state
        for(var key in states){
            if(states[key] && states.hasOwnProperty(key)){
                if(states[key].index==elementIndex){
                    states[key]=undefined;
                }
            }
        }
        context.force.start();
    }
});
