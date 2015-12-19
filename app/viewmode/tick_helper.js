define(function(){

    // Use elliptical arc path segments to doubly-encode directionality.
    return function(el){
            var path=d3.selectAll(".link"),
                condition=d3.selectAll(".condition"),
                circle=d3.selectAll("circle"),
                text=d3.selectAll(".state_name");

            //d3 mystery
            path.each(function(){
                var thisPath = d3.select(this);
                thisPath.data().forEach(function(el){
                    thisPath.attr("d",linkArc(el))
                });
            });

            condition.attr("transform", transformCondition);
            circle.attr("transform", transform);
            text.attr("transform", transform);

            /*path.attr("d", linkArc);
            condition.attr("transform", transformCondition);
            circle.attr("transform", transform);
            text.attr("transform", transform);*/

            //define new postition of arc between states
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
            //define new postition
            function transform(d) {
                return "translate(" + d.x + "," + d.y + ")";
            }
            //define new postition of transition condition
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
})
