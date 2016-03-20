//add transition array to the global object
define(function(){
    return function(force,object,source,target,condition){
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

        //edit links
        force.links().push({
            "condition":condition,
            'source':source,
            "target":target
        });
        //restart force layout
        force.start();
    }
});
