define(function(require){
    return{
        //obtain data, use it to load a mode. mode : string representing the mode to load
        getRequest : function(mode){
            var utility = require("utility/utility"),
                viewmode = require("viewmode/view_init"),
                data_helper = require("viewmode/data_helper"),
                editmode = require("editmode/edit_init"),
                server=require("utility/server_request");

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
                  complete : function(data){
                      $(".load_helper").fadeOut();
                      $("#object_container_left").css("background","transparent");
                  }
            });
            function succesFunction(getData,mode){
                if(getData){
                    var parsedData = JSON.parse(getData);
                    var parsedDataSolid =  _.cloneDeep(parsedData);
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

                    //handle send/reset
                    $("button.save").click(function(){
                        var endPostData = data_helper.cleanData(parsedData);
                        server.postRequest(endPostData);
                    });
                    $("button.reset").click(function(){
                        var parsedDataLiquid =  _.cloneDeep(parsedDataSolid);
                        viewmode.init(viewmode.extractStates([parsedDataLiquid]),parsedDataLiquid,true);
                        utility.frontEndObject([data_helper.cleanData(parsedDataLiquid)]);
                        $("#object_container_left").css("background","transparent");
                    });
                }
            }
            function errorFunction(mode){
                //there has been an error w/ ajax request
                console.log("/!\\ ajax : error retrieving data from server, local data loaded");

                var data = require("data/data_example");
                var dataSolid = _.cloneDeep(data);
                //display object
                utility.frontEndObject(data);
                //intiate view mode w/ static data
                switch (mode) {
                    case "view":
                        viewmode.init(viewmode.extractStates(data),data[0]);
                        break;
                    default:
                        viewmode.init(viewmode.extractStates(data),data[0]);
                }

                $("button.reset").click(function(){
                    var dataLiquid =  _.cloneDeep(dataSolid);
                    viewmode.init(viewmode.extractStates(dataLiquid),dataLiquid[0],true);
                    utility.frontEndObject([data_helper.cleanData(dataLiquid[0])]);
                    $("#object_container_left").css("background","transparent");
                });
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
