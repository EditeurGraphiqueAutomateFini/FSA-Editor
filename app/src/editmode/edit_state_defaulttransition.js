define(function(){
        return function(d,newSilent,newTarget,context){
            var states = context.getData.states,
                newTargetName = "";

            if(d.max_noise > 0){    //cannot be set together w/ max_noise
                d.default_transition = undefined;
                for(var state in states){
                    if(states.hasOwnProperty(state) && states[state].index === d.index){
                        states[state].default_transition = undefined;
                    }
                }
            }else{
                for(var state in states){
                    if(states.hasOwnProperty(state) && states[state]){
                        if(parseInt(states[state].index) === parseInt(newTarget)){
                            newTargetName = states[state].name;
                        }
                    }
                }

                if(d.default_transition){
                    d.default_transition.silent = newSilent;
                    d.default_transition.target = newTargetName;
                }else{
                    d.default_transition = {
                        "silent" : newSilent,
                        "target" : newTargetName
                    }
                }

                for(var state in states){
                    if(states.hasOwnProperty(state) && states[state]){
                        if(states[state].index === d.index){
                            if(states[state].default_transition){
                                states[state].default_transition.silent = newSilent;
                                states[state].default_transition.target = newTargetName;
                            }else{
                                states[state].default_transition = {
                                    "silent" : newSilent,
                                    "target" : newTargetName
                                }
                            }
                        }
                    }
                }
            }


        }
});
