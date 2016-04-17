define(function(){
    //conditionsToEdit : string array
    return function(d,conditionsToEdit,context){

        var newConditions=[],
            indexes=[], //get transition related to the edition among state transitions
            i = 0, j = 0;

        //console.log(conditionsToEdit);
         conditionsToEdit.forEach(function(element){
             d.conditions[element.index].condition = element.updatedValue;
         });

         d3.select("text.link_"+d.source.index+"_"+d.target.index)
             .text(function(d){  // /!\ probablement à factoriser avec le mode vue ...
                 var text = "",
                     matched = false;

                 if(d.conditions){
                     d.conditions.forEach(function(element){
                         if(!matched){
                             matched = true;
                             text += element.condition;
                         }else{
                             text += ", "+element.condition;
                         }
                     });
                 }

                 return text;
             });
    }
});
