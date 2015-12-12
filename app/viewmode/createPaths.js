//create path between states : container : html container /!\D3/!\ selector, states : array of states, links : links array created w/ data array
define(function(){
    return function(container,states,links){
        console.log(states,links);  //affiche les tableaux d'etats et de liens (transitions) dans la console (temporaire)

        //creating the force layout with states as nodes
        var force = d3.layout.force()
            .nodes(d3.values(states))
            .links(d3.values(links))
            .size(function(){
                container.each(function(){return [this.clientWidth,this.clientHeight]});
            })
            .linkDistance(200)
            .charge(-200)
            .on("tick",tick)
            .start();

        var svg = container;

        //create a path for each link/transition
        var path = svg.append("g").selectAll("path")
            .data(force.links())
            .enter().append("path")
            .attr("class", function(d) {return "link "+d.source.index +"_"+d.target.index;})
            .attr("marker-end", "url(#end");

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
            .call(force.drag);

        //create a text for each state w/ the name of the state and [max_nosie] if set
        var text = svg.append("g").selectAll("text")
            .data(force.nodes())
            .enter().append("text")
            .attr("x", 20)
            .attr("y", 0)
            .text(function(d) {
                var text = d.name;
                if(d.max_noise>0){
                    text+="["+d.max_noise+"]";
                }
                return text;
             });

        //create a text for each transition w/ the condition of the transition
        var condition = svg.append("g").selectAll("text")
            .data(force.links())
            .enter().append("text")
            .attr("x", 20)
            .attr("y", 0)
            .text(function(d) { return d.condition; });

        // Use elliptical arc path segments to doubly-encode directionality.
        function tick(){
            path.attr("d", linkArc);
            circle.attr("transform", transform);
            text.attr("transform", transform);
            condition.attr("transform", transformCondition);
        }
        //create arc between states
        function linkArc(d){
            var dx = d.target.x - d.source.x,
                dy = d.target.y - d.source.y,
                dr = Math.sqrt(dx * dx + dy * dy);

            //if source is pointing toward itself, create a fixed arc
            //optimisé pour 50, a modifier/tester
            if(d.target==d.source){
                var distance = 50,
                    dr1 = "50",
                    dr2 = "33";
                return "M" + d.source.x + "," + d.source.y + "A" +dr1+","+dr2+ " 0 0,1 " + (d.target.x+distance) + "," + (d.target.y+distance)+
                        ",M"+(d.target.x+distance)+","+(d.target.y+distance)+"A"+dr2+","+dr1+" 0 0,1 "+d.source.x+","+d.source.y;
            }else{
                return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
            }
        }
        //define position
        function transform(d) {
            return "translate(" + d.x + "," + d.y + ")";
        }
        //define position of transition condition
        function transformCondition(d) {
            var translate = "";
            //if source is related to itself
            if(d.source==d.target){ //todo variabiliser le 50
                translate+="translate(" + (d.source.x+50) + "," + (d.source.y+50) + ")";
            }else{
                translate+="translate(" + ((d.source.x+d.target.x)/2) + "," + ((d.source.y+d.target.y)/2) + ")";
            }
            return translate;
        }
    }
});
