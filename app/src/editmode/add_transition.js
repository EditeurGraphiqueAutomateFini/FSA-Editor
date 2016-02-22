//add transition array to the global object
define(function(){
    return function(source,target,condition,object){
        var state = object.states[source.name],
            transition = {
                condition:condition,
                target:target.name
            };

        if(state.hasOwnProperty("transitions")){
            state.transitions.push(transition);
        }else{
            object.states[source.name]["transitions"]=[transition];
        }
    }
});
