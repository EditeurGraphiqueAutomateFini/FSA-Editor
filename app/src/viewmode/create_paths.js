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

        //create a text for each transition w/ the condition of the transition
        var condition = svg.append("g").classed("condition_container",true).selectAll("text")
            .data(force.links())
            .enter().append("text")
            .attr({
                "x" : 20,
                "y" : 0,
                "class" : function(d){
                    return "condition link_"+d.source.index +"_"+d.target.index
                }
            })
            .text(function(d){return d.condition;});

    }
});
