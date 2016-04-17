// main function
define(function(require){
    var menu = require("menu/menu");

    closeContainer();
    $("#object_container_close").click(closeContainer);

    function closeContainer(){
        $("#object_container_wrapper").toggleClass("closed");
        $(this).toggleClass("panel_closed");
        if($(this).hasClass("panel_closed")){
            $("#object_container_close")
                .html(">")
                .prependTo("#object_container_wrapper");
        }else{
            $("#object_container_close")
                .html("<")
                .prependTo("body");
        }
    }

    closeContainerRight();
    $("#object_container_close_right").click(closeContainerRight);
    
    function closeContainerRight(){
        $("#object_container_wrapper_right").toggleClass("closed");
        $(this).toggleClass("panel_closed");
        if($(this).hasClass("panel_closed")){
            $("#object_container_close_right")
                .html("<")
                .prependTo("#object_container_wrapper_left");
        }else{
            $("#object_container_close_right")
                .html(">")
                .prependTo("body");
        }
    }
});
