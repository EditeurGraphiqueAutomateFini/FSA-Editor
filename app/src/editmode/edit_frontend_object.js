define(function(require){
    return function(data){
        var utility = require("utility/utility"),
            data_helper = require("viewmode/data_helper"),
            displayableData = data_helper.cleanData(data);

        utility.frontEndObject([displayableData]);
    };
});
