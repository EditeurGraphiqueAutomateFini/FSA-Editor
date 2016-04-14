define(function(){
    //edit selected state's properties
    return function(d,newTerminal,context){
        d.terminal = newTerminal;
        context.getData.states[d.name].terminal = newTerminal;
        d3.select("circle#state_"+d.index).classed("terminal",function(){
            return d.terminal;
        });
    }
});
