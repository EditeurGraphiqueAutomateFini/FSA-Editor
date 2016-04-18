define(function(){
    return function(){
        d3.selectAll("circle").each(function(d){    //testing if a state is being linked
            if(d.graphicEditor.linking){    //if linking, undo process and thus remove linking class
                d.graphicEditor.linking=false;
                d3.select("#state_"+d.index).classed("linking",false);
            }
        });
    }
});
