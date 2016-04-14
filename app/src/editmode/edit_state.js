define(function(require){
    return function(newValues,d,context){   //newValues includes newName,newTerminal,newMaxNoise,newMaxTotalNoise,newMaxDuration,newMaxTotalDuration,newDefaultTransition
        var edit_default_transition = require("editmode/edit_default_transition"),
            edit_references = require("editmode/edit_references"),
            edit_state_maxduration = require("editmode/edit_state_maxduration"),
            edit_state_maxtotalduration = require("editmode/edit_state_maxtotalduration"),
            edit_state_maxnoise = require("editmode/edit_state_maxnoise"),
            edit_state_maxtotalnoise = require("editmode/edit_state_maxtotalnoise"),
            edit_state_name = require("editmode/edit_state_name"),
            edit_state_terminal = require("editmode/edit_state_terminal");

        //edit default_transition if necessary
        if(newValues.newDefaultTransition){
            if(d.default_transition){
                if(
                    (newValues.newDefaultTransition.condition !== d.default_transition.condition)
                    || (newValues.newDefaultTransition.target !== d.default_transition.target)
                ){
                    edit_default_transition(d,newValues.newDefaultTransition.condition,newValues.newDefaultTransition.target,context);
                }
            }else{
                edit_default_transition(d,newValues.newDefaultTransition.condition,newValues.newDefaultTransition.target,context);
            }
        }
        //edit max_duration if necessary
        if(newValues.newMaxDuration !== d.max_duration){
            edit_state_maxduration(d,newValues.newMaxDuration,context);
        }

        //edit max_noise if necessary
        if(newValues.newMaxNoise !== d.max_noise){
            edit_state_maxnoise(d,newValues.newMaxNoise,context);
        }

        //edit max_total_duration if necessary
        if(newValues.newMaxTotalDuration !== d.max_total_duration){
            edit_state_maxtotalduration(d,newValues.newMaxTotalDuration,context);
        }

        //edit max_total_noise if necessary
        if(newValues.newMaxTotalNoise !== d.max_total_noise){
            edit_state_maxtotalnoise(d,newValues.newMaxTotalNoise,context);
        }

        //edit name if necessary
        if(newValues.newName !== d.name){
            edit_references(context.getData,d.name,newValues.newName);
            edit_state_name(d,newValues.newName,context);
        }

        //edit terminal if necessary
        if(newValues.newTerminal !== d.terminal){
            edit_state_terminal(d,newValues.newTerminal,context);
        }

        //restart force layout w/ new data
        context.force.start();
    }
});
