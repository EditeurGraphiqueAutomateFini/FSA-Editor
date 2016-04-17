define(function(){
    //create a link between two states
    return function(svg,force,sourceID,targetID,condition,isNew){

        if( isNew === "new"){    //create new transition (path+text)

            //adding a path for the newly created link
            var newPath = svg.select("g.path_container").selectAll("path")
                .data(force.links()).enter()
                .append("path")
                .attr({
                    "class" : "link new_link",
                    "id" : function(d) {return "link_"+sourceID +"_"+targetID},
                    "marker-end" : "url(#end)"
                });
            //adding a condition text for the newly created link
            var newCondition = svg.select("g.condition_container").selectAll("text")
                .data(force.links()).enter()
                .append("text")
                .attr({
                    "x" : 20,
                    "y" : 0,
                    "class" : function(d){return "condition link_"+sourceID +"_"+targetID+" new_link"}
                })
                .text(function(d){  // /!\ probablement à factoriser avec le mode vue ...
                    var text = "",
                        matched = false;

                    if(d.conditions){
                        d.conditions.forEach(function(element){
                            if(!matched){
                                matched = true;
                                text += element.condition;
                            }else{
                                text += ", "+element.condition;
                            }
                        });
                    }

                    return text;
                });

        }else{  //simply render the new condition (transition already exists) (only text)

            svg.select(".condition.link_"+sourceID+"_"+targetID)
                .text(function(d){  // /!\ probablement à factoriser avec le mode vue ...
                    var text = "",
                        matched = false;

                    if(d.conditions){
                        d.conditions.forEach(function(element){
                            if(!matched){
                                matched = true;
                                text += element.condition;
                            }else{
                                text += ", "+element.condition;
                            }
                        });
                    }

                    return text;
                })
                .classed("new_condition",true);
        }

        //restart force layout w/ new data
        force.start();
    }
});
