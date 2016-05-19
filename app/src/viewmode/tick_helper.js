/**
*   A module for ticking function - /!\ executed repeatedly at launch and for each drag
*   @module viewmode/tick_helper
*/
define(function(){
    /**
    *   @alias module:viewmode/tick_helper
    *   @param {Object} e - the object representing the event
    *   @param {number} r - the radius
    *   @param {number} containmentWidth - the container width
    *   @param {number} containmentHeight - the container height
    */
    var tick_helper = function(e,r,containmentWidth,containmentHeight){
        var path = d3.selectAll(".link");
        var condition = d3.selectAll(".condition");
        var circle = d3.selectAll(".state_container circle");
        var text = d3.selectAll(".state_name");

        path.attr("d",linkArc);
        condition.attr("transform", transformCondition);
        circle.attr("transform", transform);
        text.attr("transform", transform);

        /**
        *   define new postition of arc between states
        *   @param {Object} d - data for the link, supplied by D3
        *   @returns {string} - the updated value for the "transform" attribute
        */
        function linkArc(d){
            var sourceCoordX = getContainmentX(d.source.x);
            var sourceCoordY = getContainmentY(d.source.y);
            var targetCoordX = getContainmentX(d.target.x);
            var targetCoordY = getContainmentY(d.target.y);

            var dx = targetCoordX - sourceCoordX;
            var dy = targetCoordY - sourceCoordY;
            var dr = Math.sqrt(dx * dx + dy * dy);

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

        /**
        *   define new postition
        *   @param {Object} d - data for the link (or state), supplied by D3
        *   @returns {string} - the updated value for the "transform" attribute
        */
        function transform(d) {
            var coordX = getContainmentX(d.x),
                coordY = getContainmentY(d.y);

            d.graphicEditor.coordX = coordX;
            d.graphicEditor.coordY = coordY;
            return "translate(" + coordX + "," + coordY + ")";
        }

        /**
        *   define new postition of transition condition
        *   @param {Object} d - data for the link, supplied by D3
        *   @returns {string} - the updated value for the "transform" attribute
        */
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

        /**
        *   prevent the updated X position to get out of the container
        *   @param {number} valX - the new x-axis value that is to be set
        *   @returns {number} - the original value or the maximum value (defined according to the container)
        */
        function getContainmentX(valX){ return Math.max(r,Math.min(valX,containmentWidth-r)); }

        /**
        *   prevent the updated Y position to get out of the container
        *   @param {number} valY - the new y-axis value that is to be set
        *   @returns {number} - the original value or the maximum value (defined according to the container)
        */
        function getContainmentY(valY){ return Math.max(r,Math.min(valY,containmentHeight-r)); }
    };
    return tick_helper;
});
