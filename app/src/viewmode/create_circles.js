define(function(){
    return function(container,force){

        var svg = container;

        //create a circle for each state and apply D3 drag system
        var circle = svg.append("g").classed("state_container",true).selectAll("circle")
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
      }
});
