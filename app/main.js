// main function
define(function(require){

    var viewmode = require("viewmode/view_init"),
        menu = require("menu/menu"),
        utility = require("utility/utility"),
        server = require("utility/server_request");

    //checking menu function's return value
    switch (menu) {
        case "view":
            //initiate view mode w/ array of states
            var ajaxRequest = $.ajax({
                  type: 'GET',
                  url: 'http://www.martinbolot.com/graphicEditorFSA/',
                  success: succesFunction,
                  error: errorFunction
            });
            break;

        default:
            //viewmode.init(states);
    }

    //handle send/reset
    $("button.save").click(function(){
        //server.sendRequest("test1");
    });

    function succesFunction(data){
        if(data){
            var data = JSON.parse(data);

            //display object
            frontEndObject([data]);
            //initiate view mode
            viewmode.init(viewmode.extractStates([data]));
        }
    }

    function errorFunction(){
        //there has been an error w/ ajax request
        console.log("/!\\ ajax : error retrieving data from server, local data loaded");

        var data = data = require("data/data_example");
        //display object
        frontEndObject(data);
        //intiate view mode w/ static data
        viewmode.init(viewmode.extractStates(data));
    }

    function frontEndObject(data){
        displayZone = "#object_container_left";
        $(displayZone).html('{<br/>'+utility.displayObject(data,0)+'<br/>}');
        if($(displayZone).parent().find('textarea#objectArea').size()>0){   // display object in a textarea (for copy/paste)
            $(displayZone).parent().find('textarea#objectArea').val(JSON.stringify(data));
        }
    }


});
