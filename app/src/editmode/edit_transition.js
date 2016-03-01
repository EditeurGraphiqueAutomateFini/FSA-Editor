define(function(){
    //conditionsToEdit : string array
    return function(d,conditionsToEdit,context){
        conditionsToEdit.forEach(function(cond){
            context.getData.states[d.source.name].transitions.forEach(function(transition){
                if(transition.condition===d.condition && transition.target===d.target.name){
                    transition.condition = cond;
                }
            });

            console.log(context.getData);
            console.log(d,cond);
            /*d3.select("text.link_"+d.source.index+"_"+d.target.index).html(function(d){
                //return d.condition.replace(cond);
            });*/
        });

        //edit force.links ?

        //restart force layout w/ new data
        context.force.start();
    }
});
