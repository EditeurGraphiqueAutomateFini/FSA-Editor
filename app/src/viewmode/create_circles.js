define(function(){
    return function(container,force){

        var svg = container,
            state_container;

        // test if we need to create a container from the start
        // or if we are simply adding a new state to the existing container
        if(d3.select(".state_container").size() > 0){
            state_container = d3.select(".state_container");
        }else{
            state_container = svg.append("g").classed("state_container",true);
        }

        // create a circle for each state and apply D3 drag system
        state_container.selectAll("circle")
            .data(force.nodes()).enter()
            .append("circle")
            .attr({
                "r" : "15",
                "class" : function(d){
                    if(d.terminal){ return "terminal"; }
                    else{ return ""; }
                },
                "id" : function(d){
                    return "state_"+d.index;
                },
                "fill" : function(d){ return d.fill; }
            })
            .call(force.drag);
      };
});
