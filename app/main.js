// main function
define(function(require){
    var menu = require("menu/menu");

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
});
