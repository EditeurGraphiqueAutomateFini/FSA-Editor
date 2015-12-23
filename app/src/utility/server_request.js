define(function(require){
    return{
        //obtain data, use it to load a mode. mode : string representing the mode to load
        getRequest : function(mode){
            var utility = require("utility/utility"),
                viewmode = require("viewmode/view_init"),
                editmode = require("editmode/edit_init");

            var ajaxRequest = $.ajax({
                  type: 'GET',
                  url: 'http://www.martinbolot.com/graphicEditorFSA/',
                  success: function(data){
                      return succesFunction(data,mode);
                  },
                  error: function(){
                      return errorFunction(mode);
                  },
                  beforeSend : function(){
                      $(".load_helper").html("loading...").show();
                  },
                  complete : function(){
                      $(".load_helper").fadeOut();
                      $("#object_container_left").css("background","transparent");
                  }
            });
            function succesFunction(getData,mode){
                if(getData){
                    var parsedData = JSON.parse(getData);
                    //display object
                    utility.frontEndObject([parsedData]);
                    //initiate view mode

                    switch (mode) {
                        case "view":
                            viewmode.init(viewmode.extractStates([parsedData]),parsedData);
                            break;
                        case "edit":
                            viewmode.init(viewmode.extractStates([parsedData]),parsedData);
                            editmode.init();
                            break;
                        default:
                            viewmode.init(viewmode.extractStates([parsedData]),parsedData);
                    }
                }
            }
            function errorFunction(mode){
                //there has been an error w/ ajax request
                console.log("/!\\ ajax : error retrieving data from server, local data loaded");

                var data = require("data/data_example");
                //display object
                utility.frontEndObject(data);
                //intiate view mode w/ static data
                switch (mode) {
                    case "view":
                        viewmode.init(viewmode.extractStates(data),data);
                        break;
                    default:
                        viewmode.init(viewmode.extractStates(data),data);
                }
            }
        },
        postRequest: function(postData){
            var ajaxRequest = $.ajax({
                  type: 'POST',
                  data : {graphicEditorFSA:JSON.stringify(postData)},
                  url: 'http://www.martinbolot.com/graphicEditorFSA/',
                  beforeSend : function(){
                      $(".load_helper").html("saving...").fadeIn();
                  },
                  complete:function(){
                      $(".load_helper").fadeOut();
                      $("#object_container_left").css("background","transparent");
                  },
                  success: function(data){
                     // console.log(data);
                  },
                  error: function(){
                      console.log("send error");
                  }
            });
        }
    }
});
