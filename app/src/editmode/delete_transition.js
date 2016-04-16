define(function(){
    return function(d,conditionsToDelete,context){
        var states = context.getData.states,
            indexesToDelete = [],
            linkToDelete = [],
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
        context.force.links().forEach(function(object,ind){
            if(object.source.index === d.source.index && object.target.index === d.target.index){
                if(conditionsToDelete.includes(object.condition)){
                    linkToDelete.push(ind);
                }
            }
        });
        for(var i=0;i<linkToDelete.length;i++){
            context.force.links().splice(linkToDelete[i],1);
            for(j=0;j<linkToDelete.length;j++) linkToDelete[j]--;
        }

        //edit d3 html
        d3.selectAll(".condition.link_"+d.source.index+"_"+d.target.index).html(function(d){
            var conditions = "",
                alreadyMatched = false;

            context.force.links().forEach(function(conditionObject){
                if(conditionObject.source.index === d.source.index && conditionObject.target.index === d.target.index){
                    if(!alreadyMatched){
                        alreadyMatched = true;
                        conditions += conditionObject.condition;
                    }else{
                    conditions += ", "+conditionObject.condition;
                    }
                }
            });

            return conditions;
        });

        //checking if no conditions remaining. If so, delete link
        var presenceTest = false;
        context.force.links().forEach(function(conditionObject){
            if(conditionObject.source.index === d.source.index && conditionObject.target.index === d.target.index){
                presenceTest = true;
            }
        });
        if(!presenceTest){
            d3.selectAll(".link_"+d.source.index+"_"+d.target.index).remove();
            d3.select("#link_"+d.source.index+"_"+d.target.index).remove();
        }

        //restarting force w/ new nodes and links
        context.force.start();
    }
});
