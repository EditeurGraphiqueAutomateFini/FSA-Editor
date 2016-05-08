/**
*   initiate viewmode
*   @module viewmode/view_init - a module to initiate viewmode
*/
define(function(require){
    return{
        /**
        *   @exports {function} extractStates - extract states from given object
        *   @param {Object} data - data retrieved from server or client
        *   @returns {Object} states - the operational object representing states
        */
        extractStates : function(data){
            var states = [];
            // iterating over states objects in data file (JSON), making a JS array of objects
            if(data){
                for(var i=0; i < data.length; i++){
                    if(data[i].states){
                        states.push(data[i].states);
                    }
                }
            }
            return states;
        },

        /**
        *   @exports {function} getIdFromName - get an id from a given state name
        *   @param {Object} data - data retrieved from server or client
        *   @returns {string} name - the name to look for
        */
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

        /**
        *   @exports {function} getConditions - get a condition array for a given (source,target) couple
        *   @param {Object} data - data retrieved from server or client
        *   @returns {number} source - the id of the source state
        *   @returns {string} target - the name of the target state
        */
        getConditions :function(data,source,target){
            var conditions = [];

            for(var key in data){
                if(data.hasOwnProperty(key) && data[key]){
                    if(data[key].uniqueId === source && data[key].transitions){
                        data[key].transitions.forEach(function(transition){
                            if(transition.target === target){
                                conditions.push(transition);
                            }
                        });
                    }
                }
            }

            return conditions;
        },

        /**
        *   @constructor
        *   @exports {function} init - initialisation function
        *   @param {Object[]} states - array of state objects
        *   @param {Object} getData - data retrieved from server or client, will be the global data object for the application
        *   @returns {Object} - an object containing the application informations for loaded viewmode
        */
        init : function(states,getData){
            var create_svg = require("./create_svg"),
                create_force_layout = require("./create_force_layout"),
                create_circles = require("./create_circles"),
                create_state_names = require("./create_state_names"),
                create_paths = require("./create_paths"),
                create_conditions = require("./create_conditions"),
                 set_positions = require("./set_positions"),
                viewmode = require("./view_init"),
                undo = require("../utility/undo");

            if(states){
                var links = [],
                    dataset = [],
                    newLink = {},
                    key,state,
                    testPresence = false,
                    i = 0, cpt = 0;

                // compute the distinct nodes from the transitionSet
                states.forEach(function(data){
                    cpt = 0;
                    for(key in data){
                        if(data.hasOwnProperty(key)){
                            state = data[key];
                            if(state){
                                state.fixed = true;
                                state.uniqueId = cpt;
                                state.index = cpt;
                                state.name = key;

                                // add graphicEditor values if not set
                                if(!state.graphicEditor){
                                    state.graphicEditor = {};
                                }else{
                                    state.graphicEditor.origCoordX = state.graphicEditor.coordX;
                                    state.graphicEditor.origCoordY = state.graphicEditor.coordY;
                                }

                                state.x = state.graphicEditor.coordX || 0;   //known position or 0
                                state.y = state.graphicEditor.coordY || 0;

                                // push state
                                dataset.push(state);
                                cpt++;
                            }
                        }
                    }
                    for(key in data){
                        if(data.hasOwnProperty(key)){
                            state = data[key];
                            if(state){
                                if(state.transitions && state.transitions.length > 0){
                                    for(i=0; i < state.transitions.length; i++){
                                        // add the new link if not already present
                                        testPresence = links.find(function(el){
                                             return (
                                                el.source === state.uniqueId
                                                && el.target === viewmode.getIdFromName(dataset,state.transitions[i].target)
                                            );
                                        });
                                        if(!testPresence){
                                            // creating a new link
                                            newLink = {
                                                "source" : state.uniqueId,
                                                "target" : viewmode.getIdFromName(dataset,state.transitions[i].target),
                                                "conditions" : viewmode.getConditions(dataset,state.uniqueId,state.transitions[i].target)
                                            };
                                            links.push(newLink);
                                        }
                                    }
                                }
                            }
                        }
                    }
                });

                for(i = 0; i < states.length; i++){
                    set_positions(states[i]);
                }

                if($("svg#svgbox").size() > 0){
                    $("svg#svgbox").remove();
                }

                var svg = create_svg("#svg_container"),
                    force = create_force_layout(svg,dataset,links);

                create_paths(svg,force);
                create_conditions(svg,force);
                create_circles(svg,force);
                create_state_names(svg,force);

            }else{
                // todo : vue par défaut ? basculer vers le mode creation ?
            }

            // add state save on dragend
            force.drag().on("dragend",function(){
                undo.addToStack(getData);
            });

            // key bindings
            d3.select(document).on("keyup",function(){
                // ajouter un preventdefault pour les actions de base du nav ?
                if(d3.event.ctrlKey){
                    switch (d3.event.keyCode) {
                        case 90:    // on key "CTRL + Z" rollback
                            var rollBack = undo.rollBack();
                            if(rollBack){   // if any action has already been performed
                                viewmode.init(viewmode.extractStates([rollBack]),rollBack,true);
                            }
                            break;
                        case 89:    // on key "CTRL + Y" rollforth
                            var rollForth = undo.rollForth();
                            if(rollForth){   // if any action has already been performed
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
                "links" : links
            };
        }
    };
});
