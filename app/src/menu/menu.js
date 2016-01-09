define(function(){
    //return menu value (view : viewmode, edit: editmode)
    if(location.href.indexOf("test")!=-1){  //pour éviter d'avoir le menu en test, ajouter "?test=1" au bout de son url
        //exemple file:///D:/Martin/_Cours/IUT/Projet%20tuteur%C3%A9/Editeur_graphique_projet/index.html?test=1
        return "edit";
    }else{
        //code ici pour définir le menu
        //code d'exemple, à virer à priori, pas nécessaire de faire les CSS en JS
        $("body").prepend("<div class='menu'></div>");
        $(".menu").css({
                "background":"#FFF"
                ,"cursor":"pointer"
                ,"height":"100%"
                ,"left":"0"
                ,"padding":"300px"
                ,"position":"absolute"
                ,"top":"0"
                ,"width":"100%"
            })
            .html("<ul id=\"menu\"><li id=\"view\"><a href=\"#\">Mode vue</a></li><li id=\"editor\"><a href=\"#\">Mode edition</a></li></ul>");
			
		var li = document.getElementById("menu").getElementsByTagName("li"); 
		for(var i=0;i<li.length;i++){	
		var liItem = document.getElementById(li[i].id); 
		liItem.addEventListener("click",function(e){ 
		e.preventDefault(); // block the event
		console.log(this); // print this on the console
		if( this.id == "view" ){
				alert("mode vue"); // View mode
		}
		else if ( this.id == "editor"){
				alert("mode editor"); // Editor mode
		}
		else{
				alert("error");  // error if there's a problem
	  
		}
	
	     });
	}
			
	
    }
});
