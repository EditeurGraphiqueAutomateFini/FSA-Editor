define(function(){
    return function(d,conditionsToDelete,context){
        var states=context.getData.states,
            indexesToDelete=[];

        //delete transitions in global object
        for(var state in states){
            if(states[state] && states.hasOwnProperty(state)){
                if(states[state].index===d.source.index){
                    if(states[state].transitions){
                        states[state].transitions.forEach(function(object,index){
                            conditionsToDelete.forEach(function(condition){
                                if(object.condition===condition && object.target===d.target.name){
                                    indexesToDelete.push(index);
                                }
                            });
                        });
                        for(var i=0;i<indexesToDelete.length;i++){
                            states[state].transitions.splice(indexesToDelete[i],1);
                            for(var j=0;j<indexesToDelete.length;j++) indexesToDelete[j]--;
                        }
                    }
                }
            }
        }

        //delete in d3 links
        var newCondition = [];
        context.force.links().forEach(function(object){
            if(object.source.index===d.source.index && object.target.index===d.target.index){
                for (var i=0;i<object.source.transitions.length;i++){
                    if(object.source.transitions[i].target===d.target.name){
                        newCondition.push(object.source.transitions[i].condition);
                    }
                }
                object.condition = newCondition.toString();
            }
        });

        //edit d3 html
        d3.selectAll(".condition.link_"+d.source.index+"_"+d.target.index).html(function(d){return d.condition;});
        //

        //restarting force w/ new nodes and links
        context.force.start();
    }
});
