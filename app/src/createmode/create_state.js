define(function(require){
    return function(context,x,y){
        var editmode = require("editmode/edit_init"),
            get_state_edition = require("editmode/state/get_state_edition"),
            create_circles = require("viewmode/create_circles"),
            create_state_names = require("viewmode/create_state_names");


        var newMaxId = context.force.nodes().length,
            newState = {
                "name" : "",
                "graphicEditor" : {
                    "coordX" : x,
                    "coordY" : y
                },
                "x" : x,
                "y" : y,
                "px" : x,
                "py" : y,
                "fixed" : true,
                "uniqueId" : newMaxId,
                "index" : newMaxId
            };

        context.force.nodes().push(newState);

        if(!context.getData.states){
            context.getData.states = {};
        }
        context.getData.states[newState.name] = newState;

        create_circles(context.svg,context.force);
        create_state_names(context.svg,context.force);
        //asking automaticly for state properties
        get_state_edition(d3.select("#state_"+newMaxId).data()[0],context);

        // restarting editmode
        editmode.init(context.svg,context.force,context.getData,context.links);
        //restarting force layout
        context.force.start();
    };
});
