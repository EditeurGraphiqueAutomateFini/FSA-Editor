// create svg container w/ marker in a html container
define(function(){
    return function(container){
        if(container){

            var svg = d3.select(container).insert("svg",".buttons");

            svg.attr({
                "id":"svgbox"
            });

            // marker creation (will append at the end of each svg path element -> done with create_paths module)
            svg.append("defs")
                .append("marker")
                .attr({
                    "id" : "end",
                    "viewBox" : "0 -5 10 10",
                    "refX" : 25,
                    "refY" : -1,
                    "markerWidth" : 6,
                    "markerHeight" : 6,
                    "orient" : "auto"
                })
                .append("path")
                .attr("d","M0,-5L10,0L0,5");

        }else{  // if no container is supplied
            svg = "";
        }

        return svg;
    };
});
