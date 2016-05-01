define(function(require){
    return{
        // obtain data, use it to load a mode. mode : string representing the mode to load
        getRequest : function(object,mode){
            var viewmode = require("../viewmode/view_init"),
                createmode = require("../createmode/create_init"),
                data_helper = require("../viewmode/data_helper"),
                editmode = require("../editmode/edit_init"),
                utility = require("./utility"),
                undo = require("./undo"),
                server = require("./server_request");

            $.ajax({
                  type : 'GET',
                  url : object,
                  success : function(data){
                      return succesFunction(data,mode);
                  },
                  error : function(){
                      return errorFunction(mode);
                  },
                  beforeSend : function(){
                      $(".load_helper").show();
                  },
                  complete : function(){
                      $(".load_helper").fadeOut();
                      $("#object_container_left").css("background","#FFF");
                  }
            });

            /* function definition */
            function succesFunction(getData,mode){
                if(getData){
                    var parsedData = JSON.parse(getData);
                    var parsedDataSolid = _.cloneDeep(parsedData); // cloning parsed data to keep it untouched for a later reset
                    // display object
                    utility.frontEndObject([parsedData]);
                    undo.addToStack(parsedData);
                    switch (mode) {
                        case "view":
                            // initiate viewmode
                            viewmode.init(viewmode.extractStates([parsedData]),parsedData);
                            // handel reset
                            $("button.reset").click(function(){
                                var parsedDataLiquid = _.cloneDeep(parsedDataSolid);   // cloning untouched cloned data
                                // re-initiate viewmode with cloned data, adding a "true" parameter which indicates we are reseting
                                viewmode.init(viewmode.extractStates([parsedDataLiquid]),parsedDataLiquid,true);
                                // reseting front-end object display
                                utility.frontEndObject([data_helper.cleanData(parsedDataLiquid)]);
                                $("#object_container_left").css("background","#FFF");
                            });
                            break;
                        case "edit":
                            // loading view mode
                            var loadedViewMode = viewmode.init(viewmode.extractStates([parsedData]),parsedData);
                            // loading edit mode from previously loaded viewmode
                            editmode.init(loadedViewMode.svg,loadedViewMode.force,loadedViewMode.getData,loadedViewMode.links);
                            // createmode
                            var context = {"svg":loadedViewMode.svg,"force":loadedViewMode.force,"getData":loadedViewMode.getData,"links":loadedViewMode.links};
                            createmode.init(context);
                            // handling reset (same as edit mode)
                            $("button.reset").click(function(){
                                var parsedDataLiquid = _.cloneDeep(parsedDataSolid);
                                var newLoadedViewMode = viewmode.init(viewmode.extractStates([parsedDataLiquid]),parsedDataLiquid);
                                editmode.init(newLoadedViewMode.svg,newLoadedViewMode.force,newLoadedViewMode.getData,newLoadedViewMode.links);
                                utility.frontEndObject([data_helper.cleanData(parsedDataLiquid)]);
                                $("#object_container_left").css("background","#FFF");
                            });
                            break;
                        default:
                            viewmode.init(viewmode.extractStates([parsedData]),parsedData);
                    }

                    // handle saving (posting edited data)
                    $("button.save").click(function(){
                        var endPostData = data_helper.cleanData(parsedData);
                        server.postRequest(endPostData,mode);
                    });
                }
            }
            function errorFunction(){
                // there has been an error w/ ajax request
                console.log("/!\\ ajax : error retrieving data from server");
                throw new Error("An error occured when retrieving data from server");
            }
        },
        // post data to overwrite JSON file server-side
        postRequest: function(postData,mode){
            var viewmode = require("../viewmode/view_init"),
            data_helper = require("../viewmode/data_helper"),
            editmode = require("../editmode/edit_init"),
            utility = require("./utility");

            $.ajax({
                  type : 'POST',
                  data : { graphicEditorFSA : JSON.stringify(postData) },
                  url : 'http://www.fsaeditor.com',
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
