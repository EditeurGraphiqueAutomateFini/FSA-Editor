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
            .html("le menu (cliquer pour fermer)")
            .click(function(){
                $(this).hide();
            });
        return "view";
    }
});
