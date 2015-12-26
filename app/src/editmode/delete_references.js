//delete references to "name" (string) parameter in "object" (object) parameter. Designed to clean data that are being sent
define(function(){
    return function(name,object){
        var states=object.states;
        for(var state in states){
            if(states[state] && states.hasOwnProperty(state)){
                if(states[state].transitions){  //remove transitions that we do not want anymore. Errors otherwise
                    states[state].transitions.forEach(function(el,i,arr){
                        if(el.target==name){
                            arr.splice(i,1);
                        }
                    });
                }
            }
        }
    }
})
