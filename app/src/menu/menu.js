define(function(require){
    var server = require("utility/server_request")
    //return menu value (view : viewmode, edit: editmode)
    if(location.href.indexOf("test")!=-1){  //pour éviter d'avoir le menu en test, ajouter "?test=1" au bout de son url
        //exemple file:///D:/Martin/_Cours/IUT/Projet%20tuteur%C3%A9/Editeur_graphique_projet/index.html?test=1
            server.getRequest("edit"); // Editor mode
    }else{
        //code ici pour définir le menu
        $(document).ready(function(){
            $("body").prepend("<div class='menu'></div>");
            $(".menu").html("<ul id=\"menu\"><li id=\"view\"><a href=\"#\">Mode vue</a></li><li id=\"edit\"><a href=\"#\">Mode edition</a></li></ul>");

    		var li = document.getElementById("menu").getElementsByTagName("li");
    		for(var i=0;i<li.length;i++){
        		var liItem = document.getElementById(li[i].id);
        		liItem.addEventListener("click",function(e){
                    var id = this.id;
            		e.preventDefault(); // blocks the click event
                    switch (id) {   //checking clicked element's id value
                        case "view":
                            server.getRequest("view");  // View mode
                            break;
                        case "edit":
    		                server.getRequest("edit"); // Editor mode
                            break;
                        case "create":
                            break;
                        default:
                            server.getRequest("view");
                    }
                    $(".menu").hide();
    	       });
    	    }
        });
    }
});
