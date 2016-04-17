define(function(){
    return function(d,conditionsToDelete,context){
        var states = context.getData.states,
            indexesToDelete = [],
            conditionIndexesToDelete = [],
            i = 0, j = 0;

        //delete transitions in global object
        for(var state in states){
            if(states[state] && states.hasOwnProperty(state)){
                if(states[state].index === d.source.index){
                    if(states[state].transitions){

                        states[state].transitions.forEach(function(object,index){
                            conditionsToDelete.forEach(function(condition){
                                if(object.condition === condition && object.target === d.target.name){
                                    indexesToDelete.push(index);
                                }
                            });
                        });

                        for(i=0; i<indexesToDelete.length; i++){
                            states[state].transitions.splice(indexesToDelete[i],1);
                            for(j=0; j<indexesToDelete.length; j++) indexesToDelete[j]--;
                        }
                    }
                }
            }
        }

        //delete in d3 links
        if(d.conditions){

            d.conditions.forEach(function(condition,index){
                if(conditionsToDelete.includes(condition.condition)){
                    conditionIndexesToDelete.push(index);
                }
            });

            for(var i=0; i < conditionIndexesToDelete.length; i++){
                d.conditions.splice(conditionIndexesToDelete[i],1);
                for(j=0; j < conditionIndexesToDelete.length; j++) conditionIndexesToDelete[j]--;
            }
        }

        //edit html
        d3.selectAll(".condition.link_"+d.source.index+"_"+d.target.index).text(function(d){  // /!\ probablement à factoriser avec le mode vue ...
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

        //checking if no conditions remaining. If so, delete link
        if(d.conditions){
            if(d.conditions.length === 0){
                d3.selectAll(".link_"+d.source.index+"_"+d.target.index).remove();
                d3.select("#link_"+d.source.index+"_"+d.target.index).remove();
            }
        }

        //restarting force w/ new nodes and links
        context.force.start();
    }
});
