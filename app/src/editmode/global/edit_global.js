define(function(require){
    return function(newValues,context){

        // edit allow_overlap
        context.getData.allow_overlap = newValues.newOverlap;

        // edit default_matcher
        context.getData.default_matcher = newValues.newDefaultMatcher;

        if(context.getData.state_defaults){
            // edit terminal
            context.getData.state_defaults.terminal = newValues.newTerminal;

            // edit max_noise
            context.getData.state_defaults.max_noise = parseInt(newValues.newMaxNoise) || 0;

            // edit max_total_noise
            context.getData.state_defaults.max_total_noise = parseInt(newValues.newMaxTotalNoise) || 0;

            // edit max_duration
            context.getData.state_defaults.max_duration = parseInt(newValues.newMaxDuration) || 0;

            // edit max_total_duration
            context.getData.state_defaults.max_total_duration = parseInt(newValues.newMaxTotalDuration) || 0;
        }else{
            context.getData.state_defaults = {
                "terminal" : newValues.newTerminal,
                "max_noise" : newValues.newMaxNoise,
                "max_total_noise" : newValues.newMaxTotalNoise,
                "max_duration" : newValues.newMaxDuration,
                "max_total_duration" : newValues.newMaxTotalDuration,
            }
        }
    }
});
