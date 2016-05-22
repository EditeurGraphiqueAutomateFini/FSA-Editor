/**
*   Delete references to "name" (string, name of a state) parameter in "object" (object) parameter.
*   @module editmode/state/delete_references
*   @param {Object} object - the object to clear
*   @param {Object} name - the name that we do not want anymore
*/
define(function(){
    /**
    *   @alias module:editmode/state/delete_references
    */
    var delete_references = function(object,name){
        var states = object.states;
        var indexToDelete = [];
        var i = 0;
        var j = 0;

        // iterating over states
        for(var state in states){
            if(states.hasOwnProperty(state) && states[state]){
                // remove transitions that we do not want anymore.
                if(states[state].transitions){
                    // we are going to retrie the indexes we need to delete
                    indexToDelete = [];
                    // iterating over each transition and get the index if it needs to be deleted
                    states[state].transitions.forEach(function(el,index){
                        if(el.target == name){
                            indexToDelete.push(index);
                        }
                    });
                    // now that we have every index we have to delete, we delete each one
                    for(i = 0; i < indexToDelete.length; i++){
                        // cut out the index
                        states[state].transitions.splice(indexToDelete[i],1);
                        // update the index list because the array's indexes just changed with the "splice" function
                        for(j = 0; j < indexToDelete.length; j++) indexToDelete[j]--;
                    }
                }
            }
        }
    };
    return delete_references;
});
