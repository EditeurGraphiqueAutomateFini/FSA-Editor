define(function(){
        return function(d,newCondition,newTarget,context){
            var states = context.getData["states"],
                newTargetName="";


            for(var state in states){
                if(states.hasOwnProperty(state) && parseInt(states[state].index) === parseInt(newTarget)){
                    newTargetName = states[state].name;
                }
            }

            if(d.default_transition){
                d.default_transition.condition = newCondition;
                d.default_transition.target = newTargetName;
            }else{
                d.default_transition = {
                    "condition" : newCondition,
                    "target" : newTargetName
                }
            }

            for(var state in states){
                if(states.hasOwnProperty(state) && states[state].index === d.index){
                    if(states[state].default_transition){
                        states[state].default_transition.condition = newCondition;
                        states[state].default_transition.target = newTargetName;
                    }else{
                        states[state].default_transition = {
                            "condition" : newCondition,
                            "target" : newTargetName
                        }
                    }
                }
            }
        }
});
