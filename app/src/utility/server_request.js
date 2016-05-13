/**
*   Handle server request (get and post)
*   @module utility/server_request
*/
define(function(require){
    return{
        /**
        *   @exports {function} getRequest - request the data from a given url
        *   @param {Object} object - the url that was passed to the function
        *   @param {string} mode - the mode in which the application must launch
        */
        getRequest : function(object,mode,options){
            var viewmode = require("../viewmode/view_init");
            var createmode = require("../createmode/create_init");
            var data_helper = require("../viewmode/data_helper");
            var editmode = require("../editmode/edit_init");
            var utility = require("./utility");
            var undo = require("./undo");
            var server = require("./server_request");

            $.ajax({
                  type : 'GET',
                  url : object,
                  success : function(data){
                      return succesFunction(data,mode,options);
                  },
                  error : function(){
                      return errorFunction();
                  },
                  beforeSend : function(){
                      $(".load_helper").show();
                  },
                  complete : function(){
                      $(".load_helper").fadeOut();
                      $("#object_container_left").css("background","#FFF");
                  }
            });

            /**
            *   success function for ajax GET
            *   @param {Object} getData : data retrieved from the server
            *   @param {string} mode - the mode in which the application must launch
            *   @see module:utility/server_request
            */
            function succesFunction(getData,mode,options){
                if(getData){
                    var parsedData = JSON.parse(getData);
                    var parsedDataSolid = _.cloneDeep(parsedData); // cloning parsed data to keep it untouched for a later reset
                    // display object
                    utility.frontEndObject([parsedData]);
                    undo.addToStack(parsedData);
                    switch (mode) {
                        case "view":
                            // initiate viewmode
                            viewmode.init(viewmode.extractStates([parsedData]),parsedData,options);
                            // handel reset
                            $("button.reset").click(function(){
                                var parsedDataLiquid = _.cloneDeep(parsedDataSolid);   // cloning untouched cloned data
                                // re-initiate viewmode with cloned data, adding a "true" parameter which indicates we are reseting
                                viewmode.init(viewmode.extractStates([parsedDataLiquid]),parsedDataLiquid,options);
                                // reseting front-end object display
                                utility.frontEndObject([data_helper.cleanData(parsedDataLiquid)]);
                                $("#object_container_left").css("background","#FFF");
                            });
                            break;
                        case "edit":
                            // loading view mode
                            var loadedViewMode = viewmode.init(viewmode.extractStates([parsedData]),parsedData,options);
                            // loading edit mode from previously loaded viewmode
                            editmode.init(loadedViewMode.svg,loadedViewMode.force,loadedViewMode.getData,loadedViewMode.links);
                            // createmode
                            var context = {"svg":loadedViewMode.svg,"force":loadedViewMode.force,"getData":loadedViewMode.getData,"links":loadedViewMode.links};
                            createmode.init(context);
                            // handling reset (same as edit mode)
                            $("button.reset").click(function(){
                                var parsedDataLiquid = _.cloneDeep(parsedDataSolid);
                                var newLoadedViewMode = viewmode.init(viewmode.extractStates([parsedDataLiquid]),parsedDataLiquid,options);
                                editmode.init(newLoadedViewMode.svg,newLoadedViewMode.force,newLoadedViewMode.getData,newLoadedViewMode.links);
                                utility.frontEndObject([data_helper.cleanData(parsedDataLiquid)]);
                                $("#object_container_left").css("background","#FFF");
                            });
                            break;
                        default:
                            viewmode.init(viewmode.extractStates([parsedData]),parsedData,options);
                    }

                    // handle saving (posting edited data)
                    $("button.save").click(function(){
                        var endPostData = data_helper.cleanData(parsedData);
                        server.postRequest(endPostData,object,mode);
                    });
                }
            }

            /**
            *   error function for ajax GET
            *   @see module:utility/server_request
            */
            function errorFunction(){
                // there has been an error w/ ajax request
                console.log("/!\\ ajax : error retrieving data from server");
                throw new Error("An error occured when retrieving data from server");
            }
        },

        /**
        *   @exports {function} postRequest - post data to overwrite JSON file server-side
        *   @param {Object} postData - data to post
        *   @param {Object} object - the url that was passed to the function
        *   @param {string} mode - the mode in which the application must launch
        */
        postRequest: function(postData,object,mode){
            var viewmode = require("../viewmode/view_init");
            var data_helper = require("../viewmode/data_helper");
            var editmode = require("../editmode/edit_init");
            var utility = require("./utility");

            $.ajax({
                  type : 'POST',
                  data : { graphicEditorFSA : JSON.stringify(postData) },
                  url : object,
                  beforeSend : function(){
                      $(".load_helper").fadeIn();
                  },
                  complete : function(){
                      $(".load_helper").fadeOut();
                      $("#object_container_left").css("background","#FFF");
                      d3.selectAll(".new_link").classed("new_link",false);
                      switch (mode) {
                          case "view":
                              // re-initiate viewmode with cloned data, adding a "true" parameter which indicates we are reseting
                              viewmode.init(viewmode.extractStates([postData]),postData,true);
                              // reseting front-end object display
                              utility.frontEndObject([data_helper.cleanData(postData)]);
                              break;
                          case "edit":
                              var newLoadedViewMode = viewmode.init(viewmode.extractStates([postData]),postData);
                              editmode.init(newLoadedViewMode.svg,newLoadedViewMode.force,newLoadedViewMode.getData,newLoadedViewMode.links);
                              utility.frontEndObject([data_helper.cleanData(postData)]);
                              break;
                          default:
                      }
                  },
                  success : function(){
                     swal("Saved!", "JSON file successfully overwritten", "success");
                  },
                  error : function(){
                      console.log("An error occured when sending the json file");
                  }
            });
        }
    };
});
