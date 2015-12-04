define(function(require){

    var viewmode=require("app/viewmode/viewmode"),
        // data = require("data/data_test"),
        data = require("data/data_example"),
        utility = require("app/utility/utility");

    //display object
    displayZone = "#object_container_left";
    $(displayZone).html('{<br/>'+utility.displayObject(data,0)+'<br/>}');
    if($(displayZone).parent().find('textarea#objectArea').size()>0){
        $(displayZone).parent().find('textarea#objectArea').val(JSON.stringify(data));
    }
    //initiate view mode
    //viewmode.init(data);

});
