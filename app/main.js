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
                  error: errorFunction,
                  beforeSend : function(){
                      $(".load_helper").html("loading...").show();
                  },
                  complete : function(){
                      $(".load_helper").fadeOut();
                  }
            });
            break;

        default:
            //viewmode.init(states);
    }


    function succesFunction(getData){
        if(getData){
            var parsedData = JSON.parse(getData);
            //display object
            frontEndObject([parsedData]);
            //initiate view mode
            viewmode.init(viewmode.extractStates([parsedData]),parsedData);
        }
    }

    function errorFunction(){
        //there has been an error w/ ajax request
        console.log("/!\\ ajax : error retrieving data from server, local data loaded");

        var data = require("data/data_example");
        //display object
        frontEndObject(data);
        //intiate view mode w/ static data
        viewmode.init(viewmode.extractStates(data),data);
    }

    function frontEndObject(data){
        displayZone = "#object_container_left";
        $(displayZone).html('{<br/>'+utility.displayObject(data,0)+'<br/>}');
        if($(displayZone).parent().find('textarea#objectArea').size()>0){   // display object in a textarea (for copy/paste)
            $(displayZone).parent().find('textarea#objectArea').val(JSON.stringify(data));
        }
    }


});
