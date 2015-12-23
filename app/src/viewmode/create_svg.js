//create svg container w/ marker in a html container
define(function(){
    return function(container){
        if(container){

        var width = 300,
            height = 300;

        var svg = d3.select(container).insert("svg",".buttons");

        // marker creation
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

        }else{
            var svg="";
        }
        return svg;
    }
})
