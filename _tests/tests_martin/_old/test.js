(function(){
    var editMode = {
        init : function(){
            var data = [
                {
                    //unique id
                    uniqueId:1,
                    //object to which this is bound
                    boundTo:[2],
                    cx:30,
                    cy:30,
                    r:20,
                    fill:'blue'
                },
                {
                    uniqueId:2,
                    boundTo:[3],
                    cx:120,
                    cy:120,
                    r:20,
                    fill:'red'
                },
                {
                    uniqueId:3,
                    boundTo:[],
                    cx:210,
                    cy:210,
                    r:20,
                    fill:'green'
                },
                {
                    uniqueId:4,
                    boundTo:[2],
                    cx:210,
                    cy:30,
                    r:20,
                    fill:'pink'
                }
            ];


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
            var svgContainer = d3.select("#svg_container");
            var circles = svgContainer.selectAll(".circle").data(data).enter().append("div").attr("class","circle");
            var circlesAttr = circles.attr({
                "style":function(d){
                    var divStyles ='background:'+d.fill+';height:'+(d.r*2)+'px;width:'+(d.r*2)+'px;left:'+d.cx+'px;top:'+d.cy+'px;';
                    return divStyles;
                },
                "id":function(d){
                    return d.uniqueId;
                }
            });

            this.displayObject(data,"#object_container_left");
            this.enableDragNDrop('#svg_container');
            this.createPath(circles);
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
                        }else if(typeof(object[i][key])=='object'){
                            objString+=key+' : ['+object[i][key]+']';
                        }
                        else{
                            objString+=key+' : '+object[i][key];
                        }
                        objString+=",<br/>";
                    }
                }
                //removing last coma
                if(objString.charAt(objString.length-6)==','){
                    objString=objString.slice(0,-6)+objString.slice(-5);
                };
                //removing last backspace
                if(objString.slice(-5)=="<br/>"){
                    objString=objString.slice(0,-5);
                }
                //each object in the object array ends with a curl
                objString+='<br/><span style="padding-left:'+indent+'px'+';"></span>}';
                if(i!=object.length-1){
                    objString+='<br/>';
                }
            }
            $(selector).html('{<br/>'+objString+'<br/>}');
            if($(selector).parent().find('textarea#objectArea').size()>0){
                $(selector).parent().find('textarea#objectArea').val(JSON.stringify(object));
            }
        },
        enableDragNDrop : function(parent){     //enables dragndrop on each circle child of the parent
            $(parent).find('.circle').each(function(){
                $(this)
                    .draggable({
                        containment : parent,
                        zIndex: 10,
                        revert:function(obj){
                            if(obj){
                                return true;
                            }
                        },
                        drag:function(e,obj){
                            var start = $("path[id-start="+obj.helper[0].__data__.uniqueId+"]"),
                                end = $("path[id-end="+obj.helper[0].__data__.uniqueId+"]"),
                                widthObj = obj.helper[0].clientWidth;
                            start.each(function(){
                                var startAttr = $(this).attr("d");
                                $(this).attr("d",function(){
                                    return "M "+(obj.offset.left+(widthObj/2))+" "+(obj.offset.top+(widthObj/2))+" "+startAttr.slice((startAttr.indexOf("L")));
                                });
                            });
                            end.each(function(){
                                var endAttr = $(this).attr("d");
                                $(this).attr("d",function(){
                                    return endAttr.slice(0,endAttr.indexOf("L"))+"L "+(obj.offset.left+(widthObj/2))+" "+(obj.offset.top+(widthObj/2));
                                });
                            });
                        },
                        revertDuration:100
                    })
                    .droppable({
                        accept:'.circle',
                        tolerance:'touch'
                    });
            });
            //version svg
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
        },
        createPath:function(circles){
            //color of the lines
            var color='black';
            //width of the lines
            var stroke_width='2'
            var svgMarker='<defs><marker id="markerArrow" markerWidth="13" markerHeight="13" refX="20" refY="6" orient="auto"><path d="M2,2 L2,11 L10,6 L2,2" style="fill: #000;"/></marker></defs>';
            var newSvgPath = d3.select("#svg_container").append("svg").html(svgMarker);

            circles.each(function(el){
                // check if circle is bound, if so get bind coordinates
                var isBound={
                    is:false,
                    id_origin:0,
                    bindCx:0,
                    bindCy:0,
                    bindR:0
                };
                if(el.boundTo.length>0){
                    var bound = el.boundTo;
                    circles.each(function(el){
                        for(var i=0;i<bound.length;i++){
                            if(bound[i]==el.uniqueId){
                                isBound.is=true;
                                isBound.id_origin=el.uniqueId;
                                isBound.bindCx=el.cx;
                                isBound.bindCy=el.cy;
                                isBound.bindR=el.r;
                            }
                        }
                    });
                };
                if(isBound.is){
                    d3.select("#svg_container svg").append("path").attr({
                        // "class":el.uniqueId,
                        "id-start":el.uniqueId,
                        "id-end":isBound.id_origin,
                        "d":"M "+(el.cx+el.r)+" "+(el.cy+el.r)+" L "+(isBound.bindCx+isBound.bindR)+" "+(isBound.bindCy+isBound.bindR),
                        //todo un d qui se dirige vers le point le plus proche
                        // "d":"M "+(el.cx+el.r)+" "+(el.cy+el.r)+" L "+(isBound.bindCx)+" "+(isBound.bindCy),

                        "stroke":color,
                        "stroke-width":stroke_width,
                        "marker-end":"url(#markerArrow)"
                    });
                }
            });
        }
    };

    editMode.init();

})();
