/**
*   Generate a list of condition
*   @module viewmode/condition_list
*   @param {Object} d - data for the link, supplied by D3
*   @returns {string} text - the condition list
*/
define(function(){
    /**
    *   @alias module:viewmode/condition_list
    */
    var condition_list = function(d){
        var text = "";
        var matched = false;

        if(d.conditions){
            d.conditions.forEach(function(element){
                if(!matched){
                    matched = true;
                    text += element.condition;
                }else{
                    text += ", "+element.condition;
                }
            });
        }

        return text;
    };
    return condition_list;
});
