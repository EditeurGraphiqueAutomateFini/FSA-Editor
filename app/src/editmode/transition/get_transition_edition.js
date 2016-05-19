/**
*   Sweetalert prompt for transition edition
*   @module editmode/transition/get_transition_edition
*   @param {Object} d - data for the state, supplied by D3
*   @param {Object} context - the global application context (svg,force,getData,links)
*/
define(function(require){
    var get_transition_edition = function (d,context){
        var edit_transition = require("./edit_transition");
        var delete_transition = require("./delete_transition");
        var undo = require("../../utility/undo");
        var edit_frontend_object = require("../edit_frontend_object");

        swal({
            title : "Transition edition",
            text : displayTransitionsAsList(d),
            html : true,
            showCancelButton : true,
            closeOnConfirm : false,
            animation : "slide-from-top"
        },function(inputValue){
            if(inputValue){
                var conditionsToDelete = [];
                var conditionsToEdit = [];
                var editedItem = {};
                var commaError = false;
                var attribute = 0;
                var index = 0;
                var type = "";

                // get indexes of conditions that were deleted
                d3.selectAll(".condition_display.user_delete").each(function(){
                    attribute = 0;
                    index = 0;

                    attribute = this.getAttribute("id").indexOf("condition_display_")+"condition_display_".length;
                    index = parseInt(this.getAttribute("id").substr(attribute,1));

                    conditionsToDelete.push(index);
                });

                // get indexes of conditions that were edited
                d3.selectAll(".condition_display.user_edited").each(function(){
                    attribute = 0;
                    index = 0;

                    attribute = this.getAttribute("id").indexOf("condition_display_")+"condition_display_".length;
                    index = parseInt(this.getAttribute("id").substr(attribute,1));

                    editedItem = {
                        "index" : index,
                        "updatedValues" : {}
                    };

                    // iterating over each inpu field
                    d3.select(this).selectAll("input").each(function(){
                        // retrieve its type
                        type = d3.select(this).attr("type");
                        // according to the type, get the right value
                        switch (type) {
                            // in case of an input of type "text", gets either condition or matcher
                            case "text" :
                                if(d3.select(this).classed("condition_input")){
                                    editedItem.updatedValues.condition = this.value;
                                }else if(d3.select(this).classed("matcher_input")){
                                    editedItem.updatedValues.matcher = this.value;
                                }
                                break;
                            // in case of an input of type "checkbox", get the silent attribute value
                            case "checkbox" :
                                if(d3.select(this).classed("silent_input")){
                                    editedItem.updatedValues.silent = this.checked;
                                }
                                break;
                            default:
                        }
                    });

                    // add the index to the array only if the condition was not deleted (no need to edit in this case)
                    if(!d3.select(this.parentNode.parentNode).classed("user_delete")){
                        conditionsToEdit.push(editedItem);
                    }
                });

                // checking new conditions values for unauthorized commas (",")
                if(conditionsToEdit.length > 0){
                    conditionsToEdit.forEach(function(el){
                        if(el.updatedValues){
                            if(el.updatedValues.condition.indexOf(",") != -1){
                                commaError = true;
                            }
                        }
                    });
                    if(commaError){
                        swal.showInputError("\',\' is not allowed for transitions");
                        return false;
                    }else{
                        edit_transition(d,conditionsToEdit);
                    }
                }

                // delete conditions
                if(conditionsToDelete.length > 0){
                    delete_transition(d,conditionsToDelete,context);
                }

                // update front-end object and add the current application state to the stack
                edit_frontend_object(context.getData);
                undo.addToStack(context.getData);

                // close sweetalert prompt window
                swal.close();
            // on cancel
            }else if(inputValue === false){
                return false;
            // this should not happen
            }else if(inputValue === ""){
                swal.showInputError("error");
                return false;
            }
        });

        // add "user_delete" class to the element if the cross ("X") was clicked
        d3.selectAll(".custom_swal_delete").each(function(){
            d3.select(this)
                .on("click",function(){
                    d3.select(this.parentNode).classed("user_delete",true);
                });
        });

        // on input change, add "user_edited" class to the parent wrapper element
        d3.selectAll(".condition_display input").each(function(){
            d3.select(this)
                .on("change",function(){
                    d3.select(this.parentNode.parentNode).classed("user_edited",true);
                });
        });

        /**
        *   display form with properties list - iterates over each propertie to return a complete form for the sweetalert prompt
        *   @returns {string} html - the complete html form for the sweetalert prompt of transition properties
        */
        function displayTransitionsAsList(d){
            // creating a title
            var html = "<div class='transition_title'>"+d.source.name + " => "+d.target.name+"</div>";

            // creating a table-like header
            html += "<div class='header_transition'>"+
                        "<span class='header_condition'>condition</span>"+
                        "<span class='header_matcher'>matcher</span>"+
                        "<span class='header_silent'>silent</span>"+
                    "</div>";

            if(d.conditions){
                // iterating over each condition
                d.conditions.forEach(function(condition,index){
                    // adding an element with the condition properties
                    html += "<span class='swal_display condition_display' id='condition_display_"+index+"'>"+
                            "<span class='custom_swal_delete' id='delete_condition_"+index+"'>X</span>"+
                            "<label><input class='custom_swal_input condition_input' type='text' value='"+condition.condition+"' id='input_condition_"+index+"' /></label>"+
                            "<label><input class='custom_swal_input matcher_input' type='text' value='"+
                                (condition.matcher ? condition.matcher : "") +"'/>"+
                            "</label>"+
                            "<label class='checkbox_label'><input class='custom_swal_input silent_input' type='checkbox' "+
                                (condition.silent ? "checked='true'" : "") +"'/>"+
                            "</label> "+
                        "</span>";
                });
            }

            return html;
        }
    };
    return get_transition_edition;
});
