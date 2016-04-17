define(function(require){
    return{
        //extract states
        extractStates : function(data){
            var states=[];
            //iterating over states objects in data file (JSON), making a JS array of objects
            if(data){
                for(var i=0;i<data.length;i++){
                    if(data[i].states){
                        states.push(data[i].states);
                    }
                }
            }
            return states;
        },
        getIdFromName : function(data,name){
            for(var key in data){
                if(data.hasOwnProperty(key)){
                    if(data[key]){
                        if(name === data[key].name){
                            return data[key].uniqueId;
                        }
                    }
                }
            }
        },
        // initialisation function : states : array of state objects; getData: initial retrieved data
        init : function(states,getData,reset){
            var create_svg = require("viewmode/create_svg"),
                create_force_layout = require("viewmode/create_force_layout"),
                create_circles = require("viewmode/create_circles"),
                create_paths = require("viewmode/create_paths"),
                tick = require("viewmode/tick_helper"),
                data_helper = require("viewmode/data_helper"),
                set_positions = require("viewmode/set_positions"),
                viewmode = require("viewmode/view_init"),
                utility = require("utility/utility"),
                server = require("utility/server_request"),
                undo = require("utility/undo");

            if(states){
                var transitionSet = [],
                    links = [],
                    dataset = [];
                // Compute the distinct nodes from the transitionSet.
                //très moyennement satisfait du bouzin ci-dessous
                states.forEach(function(data,i){
                    var cpt=0;
                    for(var key in data){
                        if(data.hasOwnProperty(key)){
                            var state = data[key];
                            if(state){
                                state.fixed = true;
                                state.uniqueId = cpt;
                                state.index = cpt;
                                state.name = key;

                                //add graphicEditor values if not set
                                if(!state.graphicEditor){
                                    state.graphicEditor = {};
                                }else{
                                    state.graphicEditor.origCoordX = state.graphicEditor.coordX;
                                    state.graphicEditor.origCoordY = state.graphicEditor.coordY;
                                }

                                state.x = state.graphicEditor.coordX || 0;   //known position or random
                                state.y = state.graphicEditor.coordY || 0;

                                //push state
                                dataset.push(state);
                                cpt++;
                            }
                        }
                    }
                    for(var key in data){
                        if(data.hasOwnProperty(key)){
                            var state = data[key];
                            if(state){
                                if(state.transitions && state.transitions.length>0){
                                    for(var i=0; i<state.transitions.length; i++){

                                        //creating a new link
                                        var newLink = {
                                            source : state.uniqueId,
                                            target : viewmode.getIdFromName(dataset,state.transitions[i].target)
                                        }
                                        //add the new link if not already present
                                        var testPresence = links.find(function(el){ return el.source === newLink.source && el.target === newLink.target });
                                        if(!testPresence){
                                            links.push(newLink);
                                        }

                                        //creating a new transition
                                        var newTransition = {
                                            source : state.uniqueId,
                                            target : viewmode.getIdFromName(dataset,state.transitions[i].target),
                                            condition : state.transitions[i].condition
                                        };

                                        if(state.transitions[i].matcher) newTransition.matcher = state.transitions[i].matcher;
                                        if(state.transitions[i].silent) newTransition.silent = state.transitions[i].silent;
                                        //adding the new transition in any case
                                        transitionSet.push(newTransition);
                                    }
                                }
                            }
                        }
                    }
                });

                //set_positions(states[0]);
                if($("svg").size()>0){
                    $("svg").remove();
                }
                var svg = create_svg("#svg_container"),
                    force = create_force_layout(svg,dataset,links);

                create_paths(svg,force);
                create_circles(svg,force);

            }else{
                //todo : vue par défaut ? basculer vers le mode creation ?
            }

            //add state save on dragend
            force.drag().on("dragend",function(){
                undo.addToStack(getData);
            });

            //key bindings
            d3.select(document).on("keyup",function(){
                //ajouter un preventdefault pour les actions de base du nav ?
                if(d3.event.ctrlKey){
                    switch (d3.event.keyCode) {
                        case 90:    // on key "CTRL + Z" rollback
                            var rollBack = undo.rollBack();
                            if(rollBack){   //if any action has already been performed
                                viewmode.init(viewmode.extractStates([rollBack]),rollBack,true);
                            }
                            break;
                        case 89:    // on key "CTRL + Y" rollforth
                            var rollForth = undo.rollForth();
                            if(rollForth){   //if any action has already been performed
                                viewmode.init(viewmode.extractStates([rollForth]),rollForth,true);
                            }
                            break;
                        default:
                            break;
                    }
                }
            });

            return {
                "svg" : svg,
                "force" : force,
                "getData" : getData,
                "links" : links,
                "transitions" : transitionSet
            };
        }
    }
});
