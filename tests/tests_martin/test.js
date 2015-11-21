(function(){

    var emptyShell = {
        main : function(){
            var data = [
                {
                    cx:30,
                    fill:'blue'
                },
                {
                    cx:120,
                    fill:'red'
                }
            ];
            //console.log(data);
            this.displayObject(data,"#object_container");

            var svgContainer = d3.select("#svg_container").append("svg").attr("width",200).attr("height",200);
            var circles = svgContainer.selectAll("circle").data(data).enter().append("circle");
            var circlesAttr = circles.attr("cx",function(d){return d.cx;}).attr("cy",30).attr("r",30).attr("fill",function(d){return d.fill;});
        },

        displayObject : function(object,selector){      //displays an JS object on screen; object : array of object to display, selector : html tag collection to display the object in
            //todo mettre dans un textarea
            //todo gerer objets de plus d'un niveau de profondeur
            var objString = '';     //string which will contain the written object
            var indent = 20;    //indent in px

            for(var i=0;i<object.length;i++){   //iteration over the object array
                 //each object in the object array begins with a curl
                objString+='<span style="padding-left:'+indent+'px'+';"></span>{<br/>';
                for (key in object[i]){
                    if(object[i].hasOwnProperty(key)){
                        objString+='<span style="padding-left:'+indent*2+'px'+';"></span>';
                        if(typeof(object[i][key])=='string'){
                            objString+=key+' : '+'\''+object[i][key]+'\'';
                        }else{
                            objString+=key+' : '+object[i][key];
                        }
                        objString+=",<br/>";
                    }
                }
                //removing last coma
                if(objString.slice(-1)==','){
                    objString=objString.slice(0,-1);
                };
                //removing last backspace
                if(objString.slice(-5)=="<br/>"){
                    objString=objString.slice(0,-5);
                }
                //each object in the object array ends with a curl
                objString+='<br/><span style="padding-left:'+indent+'px'+';"></span>}'
                if(!i==object.length-1){
                    objString+='<br/>';
                }
            }

            $(selector).html('{<br/>'+objString+'<br/>}');
        }
    };

    emptyShell.main();

})();
