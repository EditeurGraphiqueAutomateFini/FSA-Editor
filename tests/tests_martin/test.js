(function(){

    var emptyShell = {
        main : function(){
            var data = [
                {
                    cx:30,
                    cy:30,
                    r:30,
                    fill:'blue'
                },
                {
                    cx:120,
                    cy:120,
                    r:30,
                    fill:'red'
                }
            ];
            //console.log(data);

            //drag natif d3
            var drag = d3.behavior.drag().on('drag', function() {
                d3.select(this).attr('cx', d3.event.x).attr('cy', d3.event.y);
            });

            // generation svg
            /*
            var svgContainer = d3.select("#svg_container").append("svg").attr("width",200).attr("height",200);
            var circles = svgContainer.selectAll("circle").data(data).enter().append("circle");
            var circlesAttr = circles.attr("cx",function(d){return d.cx;}).attr("cy",30).attr("r",30).attr("fill",function(d){return d.fill;}).call(drag);
            */

            //generation div
            ///*
            var svgContainer = d3.select("#svg_container");
            var circles = svgContainer.selectAll(".circle").data(data).enter().append("div").attr("class","circle");
            var circlesAttr = circles.attr("style",function(d){
                var divStyles ='background:'+d.fill+';height:'+(d.r*2)+'px;width:'+(d.r*2)+'px;left:'+d.cx+'px;top:'+d.cy+'px;';
                return divStyles;
            });
            //*/

            this.displayObject(data,"#object_container");
            this.enableDragNDrop('#svg_container');
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
        },
        enableDragNDrop : function(parent){     //enables dragndrop on each circle child of the parent
            /*$(parent).find('circle').each(function(){
                $(this)
                    .draggable({
                        containment : parent
                    })
                    .bind('mousedown', function(event,ui){
                        // bring target to front
                        $(event.target.parentElement).append( event.target);
                    })
                    .bind('drag',function(event,ui){
                        // update coordinates manually, since top/left style props don't work on SVG
                        $(event.target).attr('cx',function(){
                            var radius = parseInt($(this).attr('r'));
                            return ui.position.left+radius;
                        });
                        $(event.target).attr('cy',function(){
                            var radius = parseInt($(this).attr('r'));
                            return ui.position.top+radius;
                        });
                    });
            });*/
            $(parent).find('.circle').each(function(){
                $(this)
                    .draggable({
                        containment : parent
                    })
                    .droppable({
                        accept : function(draggableItem){
                            if(draggableItem==$(this)){
                                return false;
                            }else{
                                return true;
                            }
                        }
                    });
            });
        }
    };

    emptyShell.main();

})();
