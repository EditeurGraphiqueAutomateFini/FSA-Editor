//delete references to "name" (string) parameter in "object" (object) parameter. Designed to clean data that are being sent
define(function(){
    return function(name,object){
        var states=object.states;
        for(var state in states){
            if(states[state] && states.hasOwnProperty(state)){
                if(states[state].transitions){  //remove transitions that we do not want anymore. Errors otherwise
                    var indexToDelete=[];
                    states[state].transitions.forEach(function(el,i,arr){
                        if(el.target==name){
                            indexToDelete.push(i);
                        }
                    });
                    for(var i=0;i<indexToDelete.length;i++){
                        states[state].transitions.splice(indexToDelete[i],1);
                        for(var j=0;j<indexToDelete.length;j++) indexToDelete[j]--;
                    }
                }
            }
        }
    }
})
