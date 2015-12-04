define(function(){
    return{
        // initialisation function : [data] = array of data objects
        init : function(data){
            if(data){
                var links=[]
                // Compute the distinct nodes from the links.
                data.forEach(function(data,i){
                    data.fixed = true;
                    data.x = data.cx || i*50+20;   //known position or random
                    data.y = data.cy || i*50+20;
                    if(data.boundTo.length>0){
                        for(i=0;i<data.boundTo.length;i++){
                            links.push({
                                source : data.uniqueId,
                                target : data.boundTo[i]
                            });
                        }
                    }
                });
                this.createPaths("#svg_container",data,links);
            }else{
                //todo : vue par défaut ? basculer vers le mode creation ?
            }
        },
        //create path between states : container : html container selector, data : array of data, links : links array created w/ data array
        createPaths:function(container,data,links){
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
    }
});
