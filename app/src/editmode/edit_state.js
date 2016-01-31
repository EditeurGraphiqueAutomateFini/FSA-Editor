define(function(){
    //edit selected state's properties
    return function(d,inputValue,context){
      console.log(d);
        var oldName = d.name;
        d.name = inputValue;
        context.getData.states[d.name] = context.getData.states[oldName];
        context.getData.states[oldName] = undefined;
        d3.select("text#state_name_"+d.index).html(function(d){
          var nameText = d.max_noise>0 ? d.name+"["+d.max_noise+"]" : d.name;
          return nameText;
        });
        //restart force layout w/ new data
        context.force.start();
    }
});
