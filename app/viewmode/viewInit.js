define(function(require){
    return{
        // initialisation function : states : array of state objects
        init : function(states){
            var createPaths = require("viewmode/createPaths"),
                createSVG = require("viewmode/createSVG");
            if(states){
                var links=[],
                    dataset=[];
                // Compute the distinct nodes from the links.
                //très moyennement satisfait du bouzin ci-dessous
                states.forEach(function(data,i){
                    var cpt=0;
                    for(var key in data){
                        var state = data[key];
                        if(data.hasOwnProperty(key)){
                            state.fixed = true;
                            state.uniqueId = cpt;
                            state.name = key;
                            state.x = state.cx || setPositions(cpt);   //known position or random
                            state.y = state.cy || setPositions(cpt);
                            dataset.push(state);
                        }
                        cpt++;
                    }
                    for(var key in data){
                        var state = data[key];
                        if(data.hasOwnProperty(key)){
                            if(state.transitions && state.transitions.length>0){
                                for(var i=0;i<state.transitions.length;i++){
                                    links.push({
                                        source : state.uniqueId,
                                        target :(function(data){
                                            for(var key in data){
                                                if(state.transitions[i].target==data[key].name){
                                                    return data[key].uniqueId;
                                                }
                                            }
                                        })(dataset),
                                        condition : state.transitions[i].condition
                                    });
                                }
                            }
                        }
                    }
                });
                //createSVG("#svg_container");
                createPaths(createSVG("#svg_container"),dataset,links);
            }else{
                //todo : vue par défaut ? basculer vers le mode creation ?
            }

            //fonction pour positionner les cercles sans coordonnées
            function setPositions(cpt){
                //here goes the code of the jeanseba
                return cpt*50+20;
            }
        }
    }
});
