define(function(){
    return function(d,newMaxTotalNoise,context){
        d.max_total_noise = newMaxTotalNoise;
        if(context.getData.states[d.name]){
            context.getData.states[d.name].max_total_noise = parseInt(newMaxTotalNoise) || 0;
        }
    }
});
