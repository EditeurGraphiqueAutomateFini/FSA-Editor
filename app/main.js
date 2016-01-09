// main function
define(function(require){
    var menu = require("menu/menu"),
        server = require("utility/server_request");

    //checking menu function's return value
    switch (menu) {
        case "view":
            //initiate view mode w/ array of states
            server.getRequest("view");
            break;
        case "edit":
            server.getRequest("edit");
            break;
        case "create":
            break;
        default:
            server.getRequest("view");
    }
});
