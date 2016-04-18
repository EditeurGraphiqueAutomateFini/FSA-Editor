define(function(){
    return function(container,force){

        var svg = container;

        // create a text for each state w/ the name of the state and [max_nosie] if set
        var text = svg.append("g").classed("name_container",true).selectAll("text")
            .data(force.nodes()).enter()
            .append("text")
            .attr({
                "x" : 20,
                "y" : 0,
                "class" : "state_name",
                "id" : function(d){ return "state_name_"+d.index; }
            });
            // add state label
            text.append("tspan")
                .text(function(d){ return d.name; })
                .classed("state_name_label",true);
            // add state max noise if needed
            text.append("tspan")
                .text(function(d){ return d.max_noise > 0 ? "["+d.max_noise+"]" : ""; })
                .attr("dx",3)
                .classed("state_name_maxnoise",true);
      }
});
