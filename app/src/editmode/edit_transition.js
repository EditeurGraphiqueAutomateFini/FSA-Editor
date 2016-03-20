define(function(){
    //conditionsToEdit : string array
    return function(d,conditionsToEdit,context){

        var conditions = d.condition.split(","),
            newConditions=[],
            indexes=[]; //get transition related to the edition among state transitions

         context.getData.states[d.source.name].transitions.forEach(function(transition,index){
             conditions.forEach(function(condition){
                 if(transition.condition===condition && transition.target===d.target.name){
                     indexes.push(index);
                 }
             });
         });

         var j=0;
         for(var i=0;i<indexes.length;i++){
             for(j=0;j<conditionsToEdit.length;j++){
                 if(conditionsToEdit[j].index==i){
                     context.getData.states[d.source.name].transitions[indexes[i]].condition = conditionsToEdit[i].updatedValue;
                 }
             }
         }

         indexes.forEach(function(el){
             newConditions.push(context.getData.states[d.source.name].transitions[el].condition);
         });
         d.condition=newConditions.join();

         d3.select("text.link_"+d.source.index+"_"+d.target.index).html(function(d){
             return d.condition;
         });
    }
});
