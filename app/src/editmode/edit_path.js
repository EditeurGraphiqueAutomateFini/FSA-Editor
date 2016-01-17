define(function(){
    //create a link between two states
    return function(svg,force,sourceID,targetID,condition,isNew){
        //pushing new link to the current set of links
        if(isNew==="new"){    //create new transition (path+text)
            var forceNewLength = force.links().push({condition:condition,source:sourceID,target:targetID});
            //adding a path for the newly created link
            var newPath = svg.select("g.path_container").selectAll("path")
                .data(force.links()).enter()
                .append("path")
                .attr({
                    "class" : "link new_link",
                    "id" : function(d) {return "link_"+sourceID +"_"+targetID},
                    "marker-end" : "url(#end)"
                });
            //adding a condition text for the newly created link
            var newCondition = svg.select("g.condition_container").selectAll("text")
                .data(force.links()).enter()
                .append("text")
                .attr({
                    "x" : 20,
                    "y" : 0,
                    "class" : function(d){return "condition link_"+sourceID +"_"+targetID+" new_link"}
                })
                .text(function(d){return d.condition;});
        }else{  //simply render the new condition (transition already exists) (only text)
            force.links().forEach(function(el,ind,arr){
                if(el.source.index===sourceID && el.target.index===targetID){
                    el.condition+=","+condition;
                }
            });
            svg.select(".condition.link_"+sourceID+"_"+targetID)
                .text(function(d){return d.condition;})
                .classed("new_condition",true);
        }
        //restart force layout w/ new data
        force.start();
    }
});
