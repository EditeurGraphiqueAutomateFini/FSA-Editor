define(function(){
    return function(d,conditionsToDelete,context){
        var states = context.getData.states,
            indexesToDelete = [],
            indexeToDelete,
            i = 0, j = 0;

        //delete transitions in global object
        for(var state in states){
            if(states[state] && states.hasOwnProperty(state)){
                if(states[state].index === d.source.index){
                    if(states[state].transitions){
                        states[state].transitions.forEach(function(object,index){
                            conditionsToDelete.forEach(function(condition){
                                if(object.condition === d.conditions[condition].condition && object.target === d.target.name){
                                    indexesToDelete.push(index);
                                }
                            });
                        });
                        for(i=0; i<indexesToDelete.length; i++){
                            states[state].transitions.splice(indexesToDelete[i],1);
                            for(j=0; j < indexesToDelete.length; j++) indexesToDelete[j]--;
                        }
                    }
                }
            }
        }

        //delete in d3 links
        if(d.conditions){
            for(var i=0; i < conditionsToDelete.length; i++){
                d.conditions.splice(conditionsToDelete[i],1);
                for(j=0; j < conditionsToDelete.length; j++) conditionsToDelete[j]--;
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
                context.force.links().forEach(function(link,index){
                    if(link.source.index === d.source.index && link.target.index === d.target.index){
                        indexeToDelete = index;
                    }
                });
                context.force.links().splice(indexeToDelete,1);
            }
        }

        //restarting force w/ new nodes and links
        context.force.start();
    }
});
