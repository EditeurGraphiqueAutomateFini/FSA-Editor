define(function(require){
    return function(object,mode){
        var viewmode = require("../viewmode/view_init"),
            createmode = require("../createmode/create_init"),
            data_helper = require("../viewmode/data_helper"),
            editmode = require("../editmode/edit_init"),
            utility = require("./utility");

            $(".load_helper").fadeOut();
            $("#object_container_left").css("background","#FFF");

            var data = [object];
            var dataSolid = _.cloneDeep(data);
              // display object
              utility.frontEndObject(data);
              // intiate view mode w/ static data
              switch (mode) {
                  case "view":
                      // initiate viewmode
                      viewmode.init(viewmode.extractStates(data),data);
                      // handel reset
                      $("button.reset").click(function(){
                          var parsedDataLiquid = _.cloneDeep(dataSolid);   // cloning untouched cloned data
                          // re-initiate viewmode with cloned data, adding a "true" parameter which indicates we are reseting
                          viewmode.init(viewmode.extractStates([parsedDataLiquid]),parsedDataLiquid,true);
                          // reseting front-end object display
                          utility.frontEndObject([data_helper.cleanData(parsedDataLiquid)]);
                          $("#object_container_left").css("background","#FFF");
                      });
                      break;
                  case "edit":
                      // loading view mode
                      var loadedViewMode = viewmode.init(viewmode.extractStates(data),data);
                      // loading edit mode from previously loaded viewmode
                      editmode.init(loadedViewMode.svg,loadedViewMode.force,loadedViewMode.getData,loadedViewMode.links);
                      //create mode
                      var context = {"svg":loadedViewMode.svg,"force":loadedViewMode.force,"getData":loadedViewMode.getData,"links":loadedViewMode.links};
                      createmode.init(context);
                      // handling reset (same as edit mode)
                      $("button.reset").click(function(){
                          var parsedDataLiquid = _.cloneDeep(dataSolid);
                          var newLoadedViewMode = viewmode.init(viewmode.extractStates([parsedDataLiquid]),parsedDataLiquid);
                          editmode.init(newLoadedViewMode.svg,newLoadedViewMode.force,newLoadedViewMode.getData,newLoadedViewMode.links);
                          utility.frontEndObject([data_helper.cleanData(parsedDataLiquid)]);
                          $("#object_container_left").css("background","#FFF");
                      });
                      break;
                  default:
                      viewmode.init(viewmode.extractStates(data),data);
          }
      };
});
