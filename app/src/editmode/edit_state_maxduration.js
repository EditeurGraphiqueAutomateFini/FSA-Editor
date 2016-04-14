define(function(){
    return function(d,newMaxDuration,context){
        d.max_duration = newMaxDuration;
        if(context.getData.states[d.name]){
            context.getData.states[d.name].max_duration = newMaxDuration;
        }
    }
});
