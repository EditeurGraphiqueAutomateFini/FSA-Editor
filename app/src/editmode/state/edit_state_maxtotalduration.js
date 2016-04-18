define(function(){
    return function(d,newMaxTotalDuration,context){
        d.max_total_duration = newMaxTotalDuration;
        if(context.getData.states[d.name]){
            context.getData.states[d.name].max_total_duration = parseInt(newMaxTotalDuration) || 0;
        }
    }
});
