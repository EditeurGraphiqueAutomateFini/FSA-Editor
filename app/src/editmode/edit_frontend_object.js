/**
*   Edit the global object that is displayed front-end (right panel)
*   @module editmode/edit_frontend_object
*/
define(function(require){
    /**
    *   @constructor
    *   @alias module:editmode/edit_frontend_object
    *   @param {Object} data : data to display, the global object (getData)
    */
    return function(data){
        var utility = require("../utility/utility");
        var data_helper = require("../viewmode/data_helper");

        // pass the data through a cleaning function
        var displayableData = data_helper.cleanData(data);

        // display the data thanks to the utility module
        utility.frontEndObject([displayableData]);
    };
});
