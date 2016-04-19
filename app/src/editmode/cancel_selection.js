define(function(){
    return function(d){
        if(d){
            d3.select("#state_"+d.index).classed("editing",false);
            d.graphicEditor.linking = false;
            d3.select("#state_"+d.index).classed("linking",false);
        }
    };
});
