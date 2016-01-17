define(function(){
    return function(container,force,states,links){

        var svg = container;

        //create a circle for each state and apply D3 drag system
        var circle = svg.append("g").classed("state_container",true).selectAll("circle")
            .data(force.nodes())
            .enter().append("circle")
            .attr({
                "r":"15",
                "class" : function(d){
                    if(d.terminal){return "terminal"}
                    else{return "";}
                },
                "id" : function(d){
                    return "state_"+d.index;
                },
                "fill" : function(d){return d.fill;},
                "title": "el.name"
            })
            //add a tooltip to each circle
            .each(function(el){
                $(this).attr('title','');
                //bien mais pas de possibilite de click, a revoir
                /*$("#state_"+el.index).tooltip({
                    position: { my: "left+30 center", at: "right center" },
                    content : el.name
                });*/
            })
            .call(force.drag);


        //create a text for each state w/ the name of the state and [max_nosie] if set
        var text = svg.append("g").classed("name_container",true).selectAll("text")
            .data(force.nodes())
            .enter().append("text")
            .attr({
                "x" : 20,
                "y" : 0,
                "class" : "state_name",
                "id" : function(d){return "state_name_"+d.index;}
            })
            .text(function(d) {
                var text = d.name;
                if(d.max_noise>0){
                    text+="["+d.max_noise+"]";
                }
                return text;
             });
      }
});
