/**
*   Handle data if a JS object has been passed to fsa_editor lib
*   @module utility/local_data_handling
*   @param {Object} object - the object that was passed to the function
*   @param {string} mode - the mode in which the application must launch
*/
define(function(require){
    /**
    *   @alias module:utility/local_data_handling
    */
    var local_data_handling = function(object,mode,options){
        var viewmode = require("../viewmode/view_init");
        var createmode = require("../createmode/create_init");
        var data_helper = require("../viewmode/data_helper");
        var editmode = require("../editmode/edit_init");
        var utility = require("./utility");

        $(".load_helper").fadeOut();
        $("#object_container_left").css("background","#FFF");
        $("button.save").attr("disabled",true);

        var data = [object];
        var dataSolid = _.cloneDeep(data);
          // display object
          utility.frontEndObject(data);
          // intiate view mode w/ static data
          switch(mode) {
              case "view":
                  // initiate viewmode
                  viewmode.init(viewmode.extractStates(data),data,options);
                  // handel reset
                  $("button.reset").click(function(){
                      var parsedDataLiquid = _.cloneDeep(dataSolid);   // cloning untouched cloned data
                      // re-initiate viewmode with cloned data, adding a "true" parameter which indicates we are reseting
                      viewmode.init(viewmode.extractStates(parsedDataLiquid),parsedDataLiquid,options);
                      // reseting front-end object display
                      for(var i = 0; i < parsedDataLiquid.length; i++){
                          utility.frontEndObject([data_helper.cleanData(parsedDataLiquid[i])]);
                      }
                      $("#object_container_left").css("background","#FFF");
                  });
                  break;
              case "edit":
                  // loading view mode
                  var loadedViewMode = viewmode.init(viewmode.extractStates(data),data,options);
                  // loading edit mode from previously loaded viewmode
                  editmode.init(loadedViewMode.svg,loadedViewMode.force,loadedViewMode.getData,loadedViewMode.links);
                  //create mode
                  var context = {"svg":loadedViewMode.svg,"force":loadedViewMode.force,"getData":loadedViewMode.getData,"links":loadedViewMode.links};
                  createmode.init(context);
                  // handling reset (same as edit mode)
                  $("button.reset").click(function(){
                      var parsedDataLiquid = _.cloneDeep(dataSolid);
                      var newLoadedViewMode = viewmode.init(viewmode.extractStates(parsedDataLiquid),parsedDataLiquid,options);
                      editmode.init(newLoadedViewMode.svg,newLoadedViewMode.force,newLoadedViewMode.getData,newLoadedViewMode.links);
                      for(var i = 0; i < parsedDataLiquid.length; i++){
                          utility.frontEndObject([data_helper.cleanData(parsedDataLiquid[i])]);
                      }
                      $("#object_container_left").css("background","#FFF");
                  });
                  break;
              default:
                  viewmode.init(viewmode.extractStates(data),data,options);
          }
      };
      return local_data_handling;
});
