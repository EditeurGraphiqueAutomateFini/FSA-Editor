define(function(){
    // edit selected state's properties
    return function(d,inputValue,context){
        var oldName = d.name;

        d.name = inputValue;
        context.getData.states[d.name] = context.getData.states[oldName];
        context.getData.states[oldName] = undefined;
        d3.select("text#state_name_"+d.index+" tspan.state_name_label").html(function(d){
            return d.name;
        });

        // restart force layout w/ new data
        context.force.start();
    }
});
