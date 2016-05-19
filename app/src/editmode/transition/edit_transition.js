/**
*   Edit a transition
*   @module editmode/transition/edit_transition
*   @param {Object} d - data for the link, supplied by D3
*   @param {Object[]} conditionsToEdit - an array contaning the condition to edit
*   @param {number} conditionsToEdit[].index - the index of the condition
*   @param {Object} conditionsToEdit[].updatedValues - the updated values
*   @param {string} conditionsToEdit[].updatedValues.condition - the updated condition
*   @param {string} conditionsToEdit[].updatedValues.matcher - the updated matcher
*   @param {boolean} conditionsToEdit[].updatedValues.silent - the updated silent property
*/
define(function(){
    /**
    *   @alias module:editmode/transition/edit_transition
    */
    var edit_transition = function(d,conditionsToEdit){
        var condition_list = require("../../viewmode/condition_list");

        // iterating over conditions to edit
         conditionsToEdit.forEach(function(element){
             if(d.conditions){
                 if(d.conditions[element.index]){
                     // updates the condition if necessary
                     if(d.conditions[element.index].condition !== element.updatedValues.condition){
                         d.conditions[element.index].condition = element.updatedValues.condition;
                     }
                     // updates the matcher if necessary
                     if(d.conditions[element.index].matcher !== element.updatedValues.matcher){
                         d.conditions[element.index].matcher = element.updatedValues.matcher;
                     }
                     // updates the silent property if necessary
                     if(d.conditions[element.index].silent !== element.updatedValues.silent){
                         d.conditions[element.index].silent = element.updatedValues.silent;
                     }
                 }
             }
         });

         // editing html text
         d3.select("text.link_"+d.source.index+"_"+d.target.index)
             .text(condition_list);
    };
    return edit_transition;
});
