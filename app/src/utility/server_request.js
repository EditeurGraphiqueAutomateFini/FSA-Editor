define(function(require){
    return{
        //obtain data, use it to load a mode. mode : string representing the mode to load
        getRequest : function(mode){
            var viewmode = require("viewmode/view_init"),
                data_helper = require("viewmode/data_helper"),
                editmode = require("editmode/edit_init"),
                utility = require("utility/utility"),
                undo = require("utility/undo"),
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
                      $(".load_helper").show();
                  },
                  complete : function(data){
                      $(".load_helper").fadeOut();
                      $("#object_container_left").css("background","transparent");
                  }
            });
            function succesFunction(getData,mode){
                if(getData){
                    var parsedData = JSON.parse(getData);
                    var parsedDataSolid =  _.cloneDeep(parsedData); //cloning parsed data to keep it untouched for a later reset
                    //display object
                    utility.frontEndObject([parsedData]);
                    undo.addToStack(parsedData);
                    switch (mode) {
                        case "view":
                            //initiate viewmode
                            viewmode.init(viewmode.extractStates([parsedData]),parsedData);
                            //handel reset
                            $("button.reset").click(function(){
                                var parsedDataLiquid =  _.cloneDeep(parsedDataSolid);   //cloning untouched cloned data
                                //re-initiate viewmode with cloned data, adding a "true" parameter which indicates we are reseting
                                viewmode.init(viewmode.extractStates([parsedDataLiquid]),parsedDataLiquid,true);
                                //reseting front-end object display
                                utility.frontEndObject([data_helper.cleanData(parsedDataLiquid)]);
                                $("#object_container_left").css("background","transparent");
                            });
                            break;
                        case "edit":
                            //loading view mode
                            var loadedViewMode = viewmode.init(viewmode.extractStates([parsedData]),parsedData);
                            //loading edit mode from previously loaded viewmode
                            editmode.init(loadedViewMode.svg,loadedViewMode.force,loadedViewMode.getData,loadedViewMode.links);
                            //handling reset (same as edit mode)
                            $("button.reset").click(function(){
                                var parsedDataLiquid =  _.cloneDeep(parsedDataSolid);
                                var newLoadedViewMode = viewmode.init(viewmode.extractStates([parsedDataLiquid]),parsedDataLiquid);
                                editmode.init(newLoadedViewMode.svg,newLoadedViewMode.force,newLoadedViewMode.getData,newLoadedViewMode.links);
                                utility.frontEndObject([data_helper.cleanData(parsedDataLiquid)]);
                                $("#object_container_left").css("background","transparent");
                            });
                            break;
                        default:
                            viewmode.init(viewmode.extractStates([parsedData]),parsedData);
                    }

                    //handle saving (posting edited data)
                    $("button.save").click(function(){
                        var endPostData = data_helper.cleanData(parsedData);
                        server.postRequest(endPostData);
                    });
                }
            }
            function errorFunction(mode){
                //there has been an error w/ ajax request
                console.log("/!\\ ajax : error retrieving data from server, local data loaded");

                //thus loading local data (probablement a modifier)
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

                //handling reset (same as above)
                $("button.reset").click(function(){
                    var dataLiquid =  _.cloneDeep(dataSolid);
                    viewmode.init(viewmode.extractStates(dataLiquid),dataLiquid[0],true);
                    utility.frontEndObject([data_helper.cleanData(dataLiquid[0])]);
                    $("#object_container_left").css("background","transparent");
                });
            }
        },
        //post data to overwrite JSON file server-side
        postRequest: function(postData){
            var ajaxRequest = $.ajax({
                  type: 'POST',
                  data : {graphicEditorFSA:JSON.stringify(postData)},
                  url: 'http://www.martinbolot.com/graphicEditorFSA/',
                  beforeSend : function(){
                      $(".load_helper").fadeIn();
                  },
                  complete:function(){
                      $(".load_helper").fadeOut();
                      $("#object_container_left").css("background","transparent");
                      d3.selectAll(".new_link").classed("new_link",false);
                  },
                  success: function(data){
                     // console.log(data);
                     swal("Saved!", "JSON file successfully overwritten", "success");
                  },
                  error: function(){
                      console.log("send error");
                  }
            });
        }
    }
});
