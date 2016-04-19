define(function(){
    return function(e,r,containmentWidth,containmentHeight){
        var path = d3.selectAll(".link"),
            condition = d3.selectAll(".condition"),
            circle = d3.selectAll(".state_container circle"),
            text = d3.selectAll(".state_name");

        path.attr("d",linkArc);
        condition.attr("transform", transformCondition);
        circle.attr("transform", transform);
        text.attr("transform", transform);

        // define new postition of arc between states
        function linkArc(d){
            var sourceCoordX = getContainmentX(d.source.x),
                sourceCoordY = getContainmentY(d.source.y),
                targetCoordX = getContainmentX(d.target.x),
                targetCoordY = getContainmentY(d.target.y);

            var dx = targetCoordX - sourceCoordX,
                dy = targetCoordY - sourceCoordY,
                dr = Math.sqrt(dx * dx + dy * dy);

            // if source is pointing toward itself, create a fixed arc
            // optimisé pour 50, a modifier/tester
            if(d.target === d.source){
                var distance = 50,
                    dr1 = "50",
                    dr2 = "33";
                return "M" + sourceCoordX + "," + sourceCoordY + " A" +dr1+","+dr2+ " 0 0,1 " + (targetCoordX+distance) + "," + (targetCoordY+distance)+
                        " M"+(targetCoordX+distance)+","+(targetCoordY+distance)+" A"+dr2+","+dr1+" 0 0,1 "+ sourceCoordX + "," + sourceCoordY;
            }else{
                return "M" + sourceCoordX + "," + sourceCoordY + " A" + dr + "," + dr + " 0 0,1 " + targetCoordX + "," + targetCoordY;
            }
        }
        // define new postition
        function transform(d) {
            var coordX = getContainmentX(d.x),
                coordY = getContainmentY(d.y);

            d.graphicEditor.coordX = coordX;
            d.graphicEditor.coordY = coordY;
            return "translate(" + coordX + "," + coordY + ")";
        }
        // define new postition of transition condition
        function transformCondition(d) {
            var sourceCoordX = getContainmentX(d.source.x),
                sourceCoordY = getContainmentY(d.source.y),
                targetCoordX = getContainmentX(d.target.x),
                targetCoordY = getContainmentY(d.target.y);

            var translate = "";

            // if source is related to itself
            if(d.source == d.target){ //todo variabiliser le 50
                translate += "translate(" + (sourceCoordX+50) + "," + (sourceCoordY+50) + ")";
            }else{
                translate += "translate(" + ((sourceCoordX+targetCoordX)/2) + "," + ((sourceCoordY+targetCoordY)/2) + ")";
            }

            return translate;
        }

        function getContainmentX(valX){ return Math.max(r,Math.min(valX,containmentWidth-r)); }
        function getContainmentY(valY){ return Math.max(r,Math.min(valY,containmentHeight-r)); }
    };
});
