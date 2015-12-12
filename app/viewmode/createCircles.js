define(function(){
    return function(container,force,states,links){

        var svg = container;

        //create a circle for each state and apply D3 drag system
        var circle = svg.append("g").selectAll("circle")
            .data(force.nodes())
            .enter().append("circle")
            .attr("r", "15")
            .attr("class",function(d){
                if(d.terminal){return "terminal"}
                else{return "";}
            })
            .attr("fill", function(d){return d.fill;})
            .on("mouseover",circleHover)
            .call(force.drag);

        //create a text for each state w/ the name of the state and [max_nosie] if set
        var text = svg.append("g").selectAll("text")
            .data(force.nodes())
            .enter().append("text")
            .attr("x", 20)
            .attr("y", 0)
            .attr("class","state_name")
            .text(function(d) {
                var text = d.name;
                if(d.max_noise>0){
                    text+="["+d.max_noise+"]";
                }
                return text;
             });

        //fonction affichage propriétés etats
         function circleHover(d){
             //console.log(d);
         }
      }
});
