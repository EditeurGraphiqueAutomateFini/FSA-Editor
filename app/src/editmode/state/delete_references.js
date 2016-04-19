// delete references to "name" (string, name of a state) parameter in "object" (object) parameter. Designed to clean data that are being sent
define(function(){
    return function(object,name){
        var states = object.states,
            indexToDelete = [],
            i = 0, j = 0;

        for(var state in states){
            if(states.hasOwnProperty(state) && states[state]){
                if(states[state].transitions){  // remove transitions that we do not want anymore. Errors otherwise
                    indexToDelete = [];
                    states[state].transitions.forEach(function(el,index){
                        if(el.target == name){
                            indexToDelete.push(index);
                        }
                    });
                    for(i=0; i < indexToDelete.length; i++){
                        states[state].transitions.splice(indexToDelete[i],1);
                        for(j=0; j < indexToDelete.length; j++) indexToDelete[j]--;
                    }
                }
            }
        }
    };
});
