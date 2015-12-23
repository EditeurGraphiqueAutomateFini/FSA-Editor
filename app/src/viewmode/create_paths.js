//create path between states : container : html container /!\D3/!\ selector, states : array of states, links : links array created w/ data array
define(function(){
    return function(container,force,states,links){
        //affiche les tableaux d'etats et de liens (transitions) dans la console (temporaire)
        console.log(states,links);

        var svg = container;

        //create a path for each link/transition
        var path = svg.append("g").selectAll("path")
            .data(force.links())
            .enter().append("path")
            .attr("class", function(d) {return "link "+d.source.index +"_"+d.target.index;})
            .attr("marker-end", "url(#end");

        //create a text for each transition w/ the condition of the transition
        var condition = svg.append("g").selectAll("text")
            .data(force.links())
            .enter().append("text")
            .attr("x", 20)
            .attr("y", 0)
            .attr("class","condition")
            .text(function(d) { return d.condition; });

    }
});
