// main function
define(function(require){

    var viewmode=require("app/viewmode/viewmode"),
        data = require("data/data_example"),
        utility = require("app/utility/utility");

    //display object
    displayZone = "#object_container_left";
    $(displayZone).html('{<br/>'+utility.displayObject(data,0)+'<br/>}');
    if($(displayZone).parent().find('textarea#objectArea').size()>0){   // display object in a textarea (for copy/paste)
        $(displayZone).parent().find('textarea#objectArea').val(JSON.stringify(data));
    }

    //iterating over states objects in data file (JSON), making a JS array of objects
    var states=[];
    for(var i=0;i<data.length;i++){
        if(data[i].states){
            states.push(data[i].states);
        }
    }

    //initiate view mode w/ array of states
    viewmode.init(states);

});
