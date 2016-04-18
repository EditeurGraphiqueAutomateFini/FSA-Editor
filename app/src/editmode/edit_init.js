define(function(require){
    return{
        init: function(svg,force,getData,links){
            //utilities
            var context_menu = require("menu/context_menu"),
                editmode = require("editmode/edit_init"),
                viewmode = require("viewmode/view_init"),
                cancel_all_selections = require("editmode/cancel_all_selections"),
                undo = require("utility/undo"),
                edit_frontend_object = require("editmode/edit_frontend_object");
            //global
            var get_global_edition = require("editmode/global/get_global_edition");
            //state
            var delete_state = require("editmode/state/delete_state"),
                delete_references = require("editmode/state/delete_references"),
                get_state_edition = require("editmode/state/get_state_edition"),
                get_state_name_edition = require("editmode/state/get_state_name_edition"),
                get_max_noise_edition = require("editmode/state/get_max_noise_edition");
            //transition
            var get_condition = require("editmode/transition/get_condition"),
                get_transition_edition = require("editmode/transition/get_transition_edition");

            var context = {"svg":svg,"force":force,"getData":getData,"links":links};

            //generate global edition button
            d3.select("#global_properties").html("<button class='btn btn-primary button_edit_global_properties'>Edit global properties</button>");
            d3.selectAll("#global_properties button").on("click",function(){
                get_global_edition({"force":force,"getData":getData});
            });

            //on click on background cancel state selection
            d3.select("#svgbox").on("click",cancel_all_selections);
            force.drag().on("drag",function(d){d.graphicEditor.unselectable=true;});
            force.drag().on("dragend",function(){});    //cancel context saving on drag/click

            //iterates over svg circles (representing states)
            d3.selectAll("circle").each(function(){
                d3.select(this)
                    //on right click, call a context menu to delete or edit state
                    .on("contextmenu",function(d){
                        switch (context_menu) {
                            case "delete":
                                deleteState(d);
                                break;
                            default:
                                break;
                        }
                    })
                    //on double click, select a state
                    //on a second double click on a state, create a link between them
                    //(can be the same state, source state cannot be terminal)
                    .on("click",function(d){
                        d3.event.stopPropagation();     //stop bubbling to avoid ending in background click event
                        d3.event.preventDefault();      //in case of right click
                        if(!d.graphicEditor.unselectable){
                            selectState(d);
                        }else{
                            d.graphicEditor.unselectable=false;
                        }
                    });
            });
            d3.selectAll("text.state_name .state_name_label").each(function(){
                d3.select(this)
                    .on("click",function(d){
                        get_state_name_edition(d,context);
                    });
            });
            d3.selectAll("text.state_name .state_name_maxnoise").each(function(){
                d3.select(this)
                    .on("click",function(d){
                        get_max_noise_edition(d,context);
                    });
            });
            d3.selectAll("text.condition").each(function(){
                d3.select(this)
                    .on("click",function(d){
                        get_transition_edition(d,context);
                    });
            });

            //key bingings
            d3.select(document).on("keyup",function(){
                //ajouter un preventdefault pour les actions de base du nav ?
                if(d3.event.ctrlKey){   // key "CTRL" is pressed
                    switch (d3.event.keyCode) {
                        case 90:    // on key "CTRL + Z" rollback
                            var rollBack = undo.rollBack();
                            if(rollBack){   //if any action has already been performed
                                var newLoadedViewMode = viewmode.init(viewmode.extractStates([rollBack]),rollBack,true);
                                editmode.init(newLoadedViewMode.svg,newLoadedViewMode.force,newLoadedViewMode.getData,newLoadedViewMode.links);
                                edit_frontend_object(getData);
                            }
                            break;
                        case 89:    // on key "CTRL + Y" rollforth
                            var rollForth = undo.rollForth();
                            if(rollForth){   //if any action has already been performed
                                var newLoadedViewMode = viewmode.init(viewmode.extractStates([rollForth]),rollForth,true);
                                editmode.init(newLoadedViewMode.svg,newLoadedViewMode.force,newLoadedViewMode.getData,newLoadedViewMode.links);
                                edit_frontend_object(getData);
                            }
                            break;
                        default:
                            break;
                    }
                }else{  // key "CTRL" is not pressed
                    switch(d3.event.keyCode){
                        case 27:    //on key "ECHAP" cancel all linking process
                            cancel_all_selections();
                            break;
                        case 46:    // on key "SUPPR" delete state
                            d3.selectAll("circle").each(function(d){
                                if(isEligible(d)){
                                    deleteState(d);
                                }
                            });
                            break;
                        case 69:    // on key "E" edit state name
                            d3.selectAll("circle").each(function(d){    //testing if a state is being linked
                                if(isEligible(d)){
                                    d3.select("#state_"+d.index).classed("editing",true);
                                    get_state_edition(d,context);
                                }
                            });
                            break;
                        case 77:    //on key "M" edit max_noise
                            d3.selectAll("circle").each(function(d){    //testing if a state is being linked
                                if(isEligible(d)){
                                    d3.select("#state_"+d.index).classed("editing",true);
                                    get_max_noise_edition(d,context);
                                }
                            });
                        default:
                            break;
                    }
                }
            });

            //delete state w/ confirmation
            function deleteState(d){
                delete_state(d.index,context);
                delete_references(getData,d.name);
                //edit fe object
                edit_frontend_object(getData);
                undo.addToStack(getData);
            }
            //create a new link
            function selectState(d){
                var previouslySelectedState = false,
                    currentStateId = "#state_"+d.index;

                d3.selectAll("circle").each(function(d){    //testing if a first state is selected (being linked)
                    if(d.graphicEditor.linking){
                        previouslySelectedState=d;
                    }
                });
                if(previouslySelectedState){    //if a first state is selected, create new transition
                    d3.select(currentStateId).classed("linking",true);
                    get_condition(d,previouslySelectedState,currentStateId,context);
                }else{  //first selection of state
                    d.graphicEditor.linking=true;
                    d3.select(currentStateId).classed("linking",true);
                }
            }
            //test if a state is eligible for alteration
            function isEligible(d){
                if( //if linking edit state
                    d.graphicEditor.linking
                    && (d3.select("#state_"+d.index).classed("editing")===false)
                    && (d3.selectAll(".linking").size()===1)
                 ){
                     return true;
                 }else{
                     return false;
                 }
            }
        }
    }
});
