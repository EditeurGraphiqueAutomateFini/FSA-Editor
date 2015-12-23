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
            .attr("id","end")
            .attr("viewBox","0 -5 10 10")
            .attr("refX",25)
            .attr("refY",-1)
            .attr("markerWidth",6)
            .attr("markerHeight",6)
            .attr("orient","auto")
            .append("path")
            .attr("d","M0,-5L10,0L0,5");

        }else{
            var svg="";
        }
        return svg;
    }
})
