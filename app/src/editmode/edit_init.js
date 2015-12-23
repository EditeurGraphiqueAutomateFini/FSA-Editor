define(function(require){
    return{
        init: function(svg,force,dataset,links){

            d3.selectAll("circle").each(function(){
                d3.select(this).on("click",getState);
            });
            //get state information
            function getState(d,e,c){
                force.nodes().forEach(function(el,i){
                    if(el.name==d.name){
                        console.log(el);
                        console.log(dataset);
                    }
                });
            }
        }
    }
});
