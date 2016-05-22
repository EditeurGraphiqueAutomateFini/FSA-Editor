/**
*   Edit references to a given name in a given object
*   @module editmode/state/edit_references
*   @param {Object} object - the object where the references to the state need to be edited
*   @param {string} name - the name of the state to edit
*   @param {string} newName - the new name
*/
define(function(){
    /**
    *   @alias module:editmode/state/edit_references
    */
    var edit_references = function(object,name,newName){
        var states = object.states;

        for(var state in states){
            if(states.hasOwnProperty(state) && states[state]){
                // remove transitions that we do not want anymore
                if(states[state].transitions){
                    states[state].transitions.forEach(function(el){
                        if(el.target == name){
                            el.target = newName;
                        }
                    });
                }
            }
        }
    };
    return edit_references;
});
