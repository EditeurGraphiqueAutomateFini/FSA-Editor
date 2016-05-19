/**
*   Create svg container
*   @module viewmode/create_svg
*/
define(function(){
    /**
    *   @alias module:viewmode/create_svg
    *   @param {Object} container - a D3 element (d3.select) for the container
    *   @returns {Object} svg - the D3 selection containing the svg element
    */
    var create_svg = function(container){
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

        // if no container is supplied
        }else{
            svg = "";
        }

        return svg;
    };
    return create_svg;
});
