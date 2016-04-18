//dit references to "name" (string) parameter in "object" (object) parameter. Designed to clean data that are being sent
define(function(){
    return function(object,name,newName){
        var states = object.states,
            indexToDelete = [];

        for(var state in states){
            if(states.hasOwnProperty(state) && states[state]){
                if(states[state].transitions){  //remove transitions that we do not want anymore. Errors otherwise
                    indexToDelete = [];
                    states[state].transitions.forEach(function(el){
                        if(el.target == name){
                            el.target = newName;
                        }
                    });
                }
            }
        }
    }
})
