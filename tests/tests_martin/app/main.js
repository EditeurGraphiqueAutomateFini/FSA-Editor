define(function(require){

    var viewmode=require("app/viewmode/viewmode"),
        data = require("data/data_test"),
        utility = require("app/utility/utility");

    //initiate view mode
    viewmode.init(data);
    utility.displayObject(data,"#object_container_left");
});
