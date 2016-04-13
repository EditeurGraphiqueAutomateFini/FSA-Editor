define(function(){
        return function(d,newCondition,newTarget,context){
            var states = context.getData["states"];

            if(d.default_transition){
                d.default_transition.condition = newCondition;
                d.default_transition.target = newTarget;
            }else{
                d.default_transition = {
                    "condition" : newCondition,
                    "target" : newTarget
                }
            }
            
            for(var state in states){
                if(states.hasOwnProperty(state) && states[state].index === d.index){
                    if(states[state].default_transition){
                        states[state].default_transition.condition = newCondition;
                        states[state].default_transition.target = newTarget;
                    }else{
                        states[state].default_transition = {
                            "condition" : newCondition,
                            "target" : newTarget
                        }
                    }
                }
            }
        }
});
