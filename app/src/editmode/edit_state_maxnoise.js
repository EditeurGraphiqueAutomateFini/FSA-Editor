define(function(){
    //edit selected state's properties
    return function(d,inputValue,context){
        var oldValue = d.max_noise;
        d.max_noise = inputValue;
        context.getData.states[d.name].max_noise = inputValue;
        d3.select("text#state_name_"+d.index+" tspan.state_name_maxnoise").html(function(d){
          return "["+d.max_noise+"]";
        });

        //restart force layout w/ new data
        context.force.start();
    }
});
