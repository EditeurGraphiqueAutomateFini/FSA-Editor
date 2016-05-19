/**
*   Initiates the edit mode
*   @module editmode/edit_init
*/
define(function(require){
    return{
        /**
        *   @param {array} svg - a D3 selection for the main <svg> tag
        *   @param {Object} force - current D3 force layout object
        *   @param {Object} getData - the globaly available data obtained by JSON or JSobject, usable by the FSA Editor
        *   @param {array} links - the D3 (d3.layout.force.links()) array of links
        */
        init: function(svg,force,getData,links){
            // utilities
            var context_menu = require("../menu/context_menu");
            var editmode = require("./edit_init");
            var viewmode = require("../viewmode/view_init");
            var cancel_all_selections = require("./cancel_all_selections");
            var undo = require("../utility/undo");
            var edit_frontend_object = require("./edit_frontend_object");
            // global
            var get_global_edition = require("./global/get_global_edition");
            // state
            var delete_state = require("./state/delete_state");
            var get_state_edition = require("./state/get_state_edition");
            var get_state_name_edition = require("./state/get_state_name_edition");
            var get_max_noise_edition = require("./state/get_max_noise_edition");
            // transition
            var get_condition = require("./transition/get_condition");
            var get_transition_edition = require("./transition/get_transition_edition");

            // defining context object with usefull variable to pass when invoking functions
            var context = {"svg":svg,"force":force,"getData":getData,"links":links};

            // generate global edition button
            d3.select("#global_properties").html("<button class='btn btn-secondary button_edit_global_properties'>Edit global properties</button>");
            // add the click event for this button
            d3.selectAll("#global_properties button").on("click",function(){
                get_global_edition(context);
            });

            // on click on background cancel state selection
            d3.select("#svgbox").on("click",cancel_all_selections);
            force.drag().on("drag",function(d){ d.graphicEditor.unselectable=true; });

            // iterates over svg circles (representing states)
            d3.selectAll(".state_container circle").each(function(){
                d3.select(this)
                    // on right click, call a context menu to delete or edit state
                    .on("contextmenu",function(d){
                        switch (context_menu) {
                            case "delete":
                                deleteState(d);
                                break;
                            default:
                                break;
                        }
                    })
                    // on double click, select a state
                    // on a second double click on a state, create a link between them
                    // (can be the same state, source state cannot be terminal)
                    .on("click",function(d){
                        d3.event.stopPropagation();     // stop bubbling to avoid ending in background click event
                        d3.event.preventDefault();      // in case of right click
                        if(!d.graphicEditor.unselectable){
                            selectState(d);
                        }else{
                            d.graphicEditor.unselectable = false;
                        }
                    });
            });

            // state name : on click, display name edition interface
            d3.selectAll("text.state_name .state_name_label").each(function(){
                d3.select(this)
                    .on("click",function(d){
                        get_state_name_edition(d,context);
                    });
            });

            // state max_noise : on click, display max_noise edition interface
            d3.selectAll("text.state_name .state_name_maxnoise").each(function(){
                d3.select(this)
                    .on("click",function(d){
                        get_max_noise_edition(d,context);
                    });
            });

            // state max_noise : on click, display max_noise edition interface
            d3.selectAll("text.condition").each(function(){
                d3.select(this)
                    .on("click",function(d){
                        get_transition_edition(d,context);
                    });
            });

            // key bingings
            d3.select(document).on("keyup",function(){
                // key "CTRL" is pressed
                if(d3.event.ctrlKey){
                    var newLoadedViewMode;
                    switch (d3.event.keyCode) {
                        case 90:    // on key "CTRL + Z", do a rollback
                            var rollBack = undo.rollBack();
                            if(rollBack){   //if any action has already been performed
                                newLoadedViewMode = viewmode.init(viewmode.extractStates([rollBack]),rollBack,true);
                                editmode.init(newLoadedViewMode.svg,newLoadedViewMode.force,newLoadedViewMode.getData,newLoadedViewMode.links);
                                edit_frontend_object(getData);
                            }
                            break;
                        case 89:    // on key "CTRL + Y", do a rollforth
                            var rollForth = undo.rollForth();
                            if(rollForth){   // if any action has already been performed
                                newLoadedViewMode = viewmode.init(viewmode.extractStates([rollForth]),rollForth,true);
                                editmode.init(newLoadedViewMode.svg,newLoadedViewMode.force,newLoadedViewMode.getData,newLoadedViewMode.links);
                                edit_frontend_object(getData);
                            }
                            break;
                        default:
                            break;
                    }
                // key "CTRL" is not pressed
                }else{
                    switch(d3.event.keyCode){
                        case 27:    // on key "ECHAP", cancel all linking process
                            cancel_all_selections();
                            break;
                        case 46:    // on key "SUPPR", delete selected state
                            d3.selectAll(".state_container circle").each(function(d){
                                if(isEligible(d)){
                                    deleteState(d);
                                }
                            });
                            break;
                        case 69:    // on key "E" edit selected state name
                            d3.selectAll(".state_container circle").each(function(d){    // testing if a state is being linked
                                if(isEligible(d)){
                                    d3.select("#state_"+d.index).classed("editing",true);
                                    get_state_edition(d,context);
                                }
                            });
                            break;
                        case 77:    // on key "M" edit max_noise
                            d3.selectAll(".state_container circle").each(function(d){    // testing if a state is being linked
                                if(isEligible(d)){
                                    d3.select("#state_"+d.index).classed("editing",true);
                                    get_max_noise_edition(d,context);
                                }
                            });
                            break;
                        default:
                            break;
                    }
                }
            });

            /**
            *   a function to delete a state and edit the front-end object
            *   @param {Object} d : data for the state, supplied by D3
            *   @see module:editmode/state/delete_state
            */
            function deleteState(d){
                // call delete_state module
                delete_state(d,context);

                // edit fe object
                edit_frontend_object(getData);
                undo.addToStack(getData);
            }

            /**
            *   a function that tries to create a new link if a state is already selected
            *   @param {Object} d : data for the state, supplied by D3
            *   @see module:editmode/transition/get_condition
            */
            function selectState(d){
                var previouslySelectedState = false;
                var currentStateId = "#state_"+d.index;

                // testing if a first state is selected (being linked)
                d3.selectAll(".state_container circle").each(function(d){
                    if(d.graphicEditor.linking){
                        previouslySelectedState = d;
                    }
                });

                // if a first state is selected, create new transition
                if(previouslySelectedState){
                    d3.select(currentStateId).classed("linking",true);
                    d3.select(currentStateId).classed("editing",true);
                    get_condition(d,previouslySelectedState,currentStateId,context);
                // first selection of state
                }else{
                    d.graphicEditor.linking = true;
                    d3.select(currentStateId).classed("linking",true);
                }
            }

            /**
            *   a function that tests if a state is eligible for alteration
            *   @param {Object} d : data for the state, supplied by D3
            *   @return {boolean} - true if the state is eligible (not currently being linked or edited )
            */
            function isEligible(d){
                return (
                    d.graphicEditor.linking
                    && (d3.select("#state_"+d.index).classed("editing") === false)
                    && (d3.selectAll(".linking").size() === 1)
                );
            }
        }
    };
});
