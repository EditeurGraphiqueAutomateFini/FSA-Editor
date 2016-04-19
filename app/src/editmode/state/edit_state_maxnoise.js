define(function(){
    // edit selected state's properties
    return function(d,inputValue,context){
        d.max_noise = inputValue;
        context.getData.states[d.name].max_noise = parseInt(inputValue) || 0;
        d3.select("text#state_name_"+d.index+" tspan.state_name_maxnoise").html(function(d){
          return d.max_noise > 0 ? "["+d.max_noise+"]" : "";
        });

        // restart force layout w/ new data
        context.force.start();
    };
});
