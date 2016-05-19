/**
*   Cancel a sepecific state selection
*   @module editmode/cancel_selection
*   @param {Object} d : data for the state, supplied by D3
*/
define(function(){
    var cancell_selection = function(d){
        // if D3 data has correctly been supplied, cancel selection
        if(d){
            d.graphicEditor.linking = false;
            d3.select("#state_"+d.index).classed("editing",false);
            d3.select("#state_"+d.index).classed("linking",false);
        }
    };
    return cancell_selection;
});
