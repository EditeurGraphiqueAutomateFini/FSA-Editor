/**
*   Edit default_transition property for a state
*   @module editmode/state/edit_state_defaulttransition
*/
define(function(){
    /**
    *   @constructor
    *   @alias module:editmode/state/edit_state_defaulttransition
    *   @param {Object} d - data for the state, supplied by D3
    *   @param {boolean} newSilent - the new default_transition.silent property
    *   @param {number} newTarget - the new default_transition.target property (the id of a state)
    *   @param {Object} context - the global application context (svg,force,getData,links)
    */
    return function(d,newSilent,newTarget,context){
        var states = context.getData.states;
        var newTargetName = "";
        var state;

        // default_transition cannot be set together w/ max_noise
        if(d.max_noise > 0){
            d.default_transition = undefined;
            for(state in states){
                if(states.hasOwnProperty(state) && states[state]){
                    if(states[state].index === d.index){
                        states[state].default_transition = undefined;
                    }
                }
            }
        }else{
            // get the state name from the "newTarget" number
            for(state in states){
                if(states.hasOwnProperty(state) && states[state]){
                    if(parseInt(states[state].index) === parseInt(newTarget)){
                        newTargetName = states[state].name;
                    }
                }
            }

            // if the default_transition property is already set
            if(d.default_transition){
                d.default_transition.silent = newSilent;
                d.default_transition.target = newTargetName;
            // if the default_transition property is not yet set
            }else{
                d.default_transition = {
                    "silent" : newSilent,
                    "target" : newTargetName
                };
            }

            // iterating over states in the global object
            for(state in states){
                if(states.hasOwnProperty(state) && states[state]){
                    // if we are in the state we want to work on
                    if(states[state].index === d.index){
                        // edit the default_transition property with new values if already existing
                        if(states[state].default_transition){
                            states[state].default_transition.silent = newSilent;
                            states[state].default_transition.target = newTargetName;
                        // set the newly created default_transition properties if not existing yet
                        }else{
                            states[state].default_transition = {
                                "silent" : newSilent,
                                "target" : newTargetName
                            };
                        }
                    }
                }
            }
        }
    };
});
