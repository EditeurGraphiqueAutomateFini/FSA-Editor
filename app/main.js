// main function
module.exports = function(object,mode){
        var server = require("./src/utility/server_request");
        var local_data_hangling = require("./src/utility/local_data_handling");

        //templating
        $("#fsa_editor").html(function(){
            var html = ""+
                "<div id='svg_container'>"+
                    "<div id='global_properties'></div>"+
                    "<div class='buttons'>"+
                        "<button class='reset btn btn-danger'>Reset</button>"+
                        "<button class='save btn btn-success'>Save</button>"+
                    "</div>"+
                 "</div>"+
                 "<div id='object_container_wrapper_left'>"+
                      "<div id='object_container_right'></div>"+
                      "<div id='object_container_close_right' class='reset btn btn-default'>></div>"+
                  "</div>"+
                 "<div id='object_container_wrapper'>"+
                     "<div id='object_container_close' class='reset btn btn-default'>></div>"+
                     "<div id='object_container_left'></div>"+
                 "</div>"+
                 "<div class='load_helper'></div>"
            ;

            return html;
        });

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
