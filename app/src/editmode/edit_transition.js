define(function(){
    //conditionsToEdit : string array
    return function(d,conditionsToEdit,context){
        console.log(d);
        conditionsToEdit.forEach(function(cond){
            context.getData.states[d.source.name].transitions.forEach(function(transition){
                if(transition.condition===cond && transition.target===d.target.name){
                    transition.condition = cond;
                }
            });
        });
        /*d3.select("text#state_name_"+d.index).html(function(d){
          var nameText = d.max_noise>0 ? d.name+"["+d.max_noise+"]" : d.name;
          return nameText;
      });*/
        //restart force layout w/ new data
        context.force.start();
    }
});
