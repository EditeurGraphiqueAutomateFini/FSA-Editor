define(function(){
    return function(elementIndex,context){
        var states = context.getData.states;
        //suppress node at index elementIndex
        context.force.nodes().forEach(function(el,i,arr){
            if(el.index==elementIndex){
                arr.splice(i,1);
                d3.select("#state_"+elementIndex).remove();
            }
        });
        //delete links w/ source or target pointing at elementIndex
        context.force.links().forEach(function(el,i,arr){
            if(el.source.index==elementIndex || el.target.index==elementIndex){
                arr.slice(i,1);
            }
        });
        //delete state name
        d3.select(".state_name_"+elementIndex).remove();
        //delete departing links
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
    }
});
