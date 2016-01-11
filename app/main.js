// main function
define(function(require){
    var menu = require("menu/menu");

    $("#object_textarea label").click(function(){
        var forAttr = $(this).attr("for");
        $("#"+forAttr).select();
    })
});
