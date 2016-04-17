//create path between states : container : html container /!\D3/!\ selector, states : array of states, links : links array created w/ data array
define(function(){
    return function(container,force){

        var svg = container;

        //create a text for each transition w/ the condition of the transition
        var condition = svg.append("g").classed("condition_container",true).selectAll("text")
            .data(force.links())
            .enter()
            .append("text")
            .attr({
                "x" : 20,
                "y" : 0,
                "class" : function(d){
                    return "condition link_"+d.source.index +"_"+d.target.index
                }
            })
            .text(function(d){
                var text = "",
                    matched = false;

                d.conditions.forEach(function(element){
                    if(!matched){
                        matched = true;
                        text += element.condition;
                    }else{
                        text += ", "+element.condition;
                    }
                });

                return text;
             });

    }
});
