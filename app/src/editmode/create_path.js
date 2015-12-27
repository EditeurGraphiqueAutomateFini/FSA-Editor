define(function(){
    //create a link between two states
    return function(svg,force,sourceID,targetID,condition){
        //pushing new link to the current set of links
        var forceNewLength = force.links().push({condition:condition,source:sourceID,target:targetID});
        //restart force layout w/ new data
        force.start();
        //adding a path for the newly created link
        var newPath = svg.select("g.path_container").selectAll("path")
            .data(force.links()).enter()
            .append("path")
            .attr({
                "class" : function(d) {return "link link_"+sourceID +"_"+targetID+" new_link";},
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
            .text(function(d) { return d.condition; });
    }
});
