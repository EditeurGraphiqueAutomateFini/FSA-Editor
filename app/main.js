// main function
define(function(require){
    var menu = require("menu/menu");

    $("#object_textarea label").click(function(){
        var forAttr = $(this).attr("for");
        $("#"+forAttr).select();
    });
    $("#object_container_close").click(function(){
        $("#object_container_wrapper").toggleClass("closed");
        if($(this).hasClass("panel_closed")){
            $("#object_container_close")
                .html("X")
                .prependTo("#object_container_wrapper");
        }else{
            $("#object_container_close")
                .html("<")
                .prependTo("body");
        }
        $(this).toggleClass("panel_closed");
    })
});
