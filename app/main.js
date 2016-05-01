// main function
module.exports = function(object,mode){
        var server = require("./src/utility/server_request");
        var local_data_hangling = require("./src/utility/local_data_handling");

        if(typeof(object) === "string"){
            server.getRequest(object,mode);
        }else{
            local_data_hangling(object,mode);
        }

        //right panel
        closeContainer("#object_container_wrapper","#object_container_close","left");
        $("#object_container_close").click(function(){
            closeContainer("#object_container_wrapper","#object_container_close","left");
        });

        //left pannel
        closeContainer("#object_container_wrapper_left","#object_container_close_right","right");
        $("#object_container_close_right").click(function(){
            closeContainer("#object_container_wrapper_left","#object_container_close_right","right");
        });

        function closeContainer(wrapper,button,orientation){
            $(wrapper).toggleClass("closed");
            if($(button).hasClass("panel_closed")){
                $(button)
                    .html((orientation === "left" ? ">" : "<"))
                    .prependTo(wrapper);
            }else{
                $(button)
                    .html((orientation === "left" ? "<" : ">"))
                    .prependTo("body");
            }
            $(button).toggleClass("panel_closed");
        }

    };
