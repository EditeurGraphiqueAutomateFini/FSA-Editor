//create path between states : container : html container /!\D3/!\ selector, states : array of states, links : links array created w/ data array
define(function(){
    return function(container,force,links){

        var svg = container;

        //create a path for each link/transition
        var path = svg.append("g").classed("path_container",true).selectAll("path")
            .data(force.links())
            .enter().append("path")
            .attr({
                "class" : "link",
                "id" : function(d){return "link_"+d.source.index +"_"+d.target.index;},
                "marker-end" : "url(#end)"
            });


        /* this process is intended to regroup all conditions for a same "source/target" couple */
        var gatheredLinks = _.cloneDeep(force.links())
            .map(function(mappingElement,ind,arr){
                var groupedCondition = mappingElement.condition;

                for(var i = ind+1 ; i<arr.length ; i++){
                    if(
                        arr[i].source.index === mappingElement.source.index
                        && arr[i].target.index === mappingElement.target.index
                    ){
                        groupedCondition += ", "+ arr[i].condition;
                    }
                }

                mappingElement.condition = groupedCondition;

                return {
                    "source" : mappingElement.source,
                    "target" : mappingElement.target,
                    "condition" : mappingElement.condition
                };
            })
            .filter(function(filteringElement,ind,arr){
                for(var i = ind-1 ; i>=0 ; i-- ){
                    if(
                        arr[i].source.index === filteringElement.source.index
                        && arr[i].target.index === filteringElement.target.index
                    ){
                        return false;
                    }
                }
                return true;
            });

        //create a text for each transition w/ the condition of the transition
        var condition = svg.append("g").classed("condition_container",true).selectAll("text")
            .data(gatheredLinks)
            .enter()
            .append("text")
            .attr({
                "x" : 20,
                "y" : 0,
                "class" : function(d){
                    return "condition link_"+d.source.index +"_"+d.target.index
                }
            })
            .text(function(d){ return d.condition; });

    }
});
