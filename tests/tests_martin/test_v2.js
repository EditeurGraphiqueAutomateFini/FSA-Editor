(function(){
    var editMode = {
        init : function(){
            var data = [
                {
                    //unique id
                    //object to which this is bound
                    uniqueId:0,
                    boundTo:[1],
                    cx:30,
                    cy:30,
                    r:20,
                    fill:'blue'
                },
                {
                    uniqueId:1,
                    boundTo:[2],
                    cx:120,
                    cy:120,
                    r:40,
                    fill:'red'
                },
                {
                    uniqueId:2,
                    boundTo:[2,1],
                    cx:210,
                    cy:210,
                    r:20,
                    fill:'green'
                },
                {
                    uniqueId:3,
                    boundTo:[1],
                    cx:210,
                    cy:30,
                    r:20,
                    fill:'pink'
                }
            ];

            this.displayObject(data,"#object_container_left");
            this.createPath("#svg_container",data);
        },
        displayObject : function(object,selector){      //displays a JS object on screen; object : array of object to display, selector : html tag collection to display the object in
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
        createPath:function(container,data){
            var links=[]
            // Compute the distinct nodes from the links.
            data.forEach(function(data,i){
                data.fixed = true;
                data.x = data.cx;
                data.y = data.cy;
                if(data.boundTo.length>0){
                    for(i=0;i<data.boundTo.length;i++){
                        links.push({
                            source : data.uniqueId,
                            target : data.boundTo[i]
                        });
                    }
                }
            });

            var width = 300,
                height = 300;

            var force = d3.layout.force()
                .nodes(d3.values(data))
                .links(d3.values(links))
                .size([width, height])
                .linkDistance(200)
                .charge(-200)
                .on("tick",tick)
                .start();

            var svg = d3.select(container).append("svg");

            // Per-type markers, as they don't inherit styles.
            svg.append("defs")
                .append("marker")
                .attr("id","end")
                .attr("viewBox","0 -5 10 10")
                .attr("refX",25)
                .attr("refY",-1)
                .attr("markerWidth",6)
                .attr("markerHeight",6)
                .attr("orient","auto")
                .append("path")
                .attr("d","M0,-5L10,0L0,5");

            var path = svg.append("g").selectAll("path")
                .data(force.links())
                .enter().append("path")
                .attr("class", function(d) {return "link "+d.source.index +"_"+d.target.index;})
                .attr("marker-end", "url(#end");

            var circle = svg.append("g").selectAll("circle")
                .data(force.nodes())
                .enter().append("circle")
                .attr("r", "15")
                // .attr("r", function(d){return d.r;})
                .attr("fill", function(d){return d.fill;})
                .call(force.drag);

            var drag = force.drag()
                .on("dragend", dragstart);

            function dragstart(d){
                d3.select(this).classed("fixed", d.fixed = true);
            }

            // Use elliptical arc path segments to doubly-encode directionality.
            function tick(){
                path.attr("d", linkArc);
                circle.attr("transform", transform);
            }

            function linkArc(d){
                var dx = d.target.x - d.source.x,
                    dy = d.target.y - d.source.y,
                    dr = Math.sqrt(dx * dx + dy * dy);

                if(d.target==d.source){
                    var dr1 = "50",
                        dr2 = "33";
                    return "M" + d.source.x + "," + d.source.y + "A" +dr1+","+dr2+ " 0 0,1 " + (d.target.x+50) + "," + (d.target.y+50)+
                            ",M"+(d.target.x+50)+","+(d.target.y+50)+"A"+dr2+","+dr1+" 0 0,1 "+d.source.x+","+d.source.y;
                }else{
                    return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
                }
            }

            function transform(d) {
                return "translate(" + d.x + "," + d.y + ")";
            }

        }
    };

    editMode.init();

})();
