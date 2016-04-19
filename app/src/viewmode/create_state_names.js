define(function(){
    return function(container,force){

        var svg = container,
            name_container;

        // test if we need to create a container from the start
        // or if we are simply adding a new state to the existing container
        if(d3.select(".name_container").size() > 0){
            name_container = d3.select(".name_container");
        }else{
            name_container = svg.append("g").classed("name_container",true);
        }

        // create a text for each state w/ the name of the state and [max_nosie] if set
        var text = name_container.selectAll("text")
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
      };
});
