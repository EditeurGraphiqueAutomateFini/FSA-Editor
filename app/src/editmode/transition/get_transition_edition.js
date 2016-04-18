define(function(require){
        return function (d,context){    // get new name w/ prompt-like
            var edit_transition = require("editmode/transition/edit_transition"),
                delete_transition = require("editmode/transition/delete_transition"),
                undo = require("utility/undo"),
                edit_frontend_object = require("editmode/edit_frontend_object");

            swal({
                title : "Transition edition",
                text : displayTransitionsAsList(d),
                html : true,
                showCancelButton : true,
                closeOnConfirm : false,
                animation : "slide-from-top"
            },function(inputValue){
                if(inputValue){
                    var conditionsToDelete = [],
                        conditionsToEdit = [],
                        editedItem = {},
                        commaError = false,
                        attribute = 0,
                        index = 0,
                        type = "";

                    d3.selectAll(".condition_display.user_delete").each(function(){
                        attribute = 0;
                        index = 0;

                        attribute = this.getAttribute("id").indexOf("condition_display_")+"condition_display_".length;
                        index = parseInt(this.getAttribute("id").substr(attribute,1));

                        conditionsToDelete.push(index);
                    });
                    d3.selectAll(".condition_display.user_edited").each(function(){
                        attribute = 0,
                        index = 0;

                        attribute = this.getAttribute("id").indexOf("condition_display_")+"condition_display_".length;
                        index = parseInt(this.getAttribute("id").substr(attribute,1));

                        editedItem = {
                            "index" : index,
                            "updatedValues" : {}
                        };

                        d3.select(this).selectAll("input").each(function(){
                            type = d3.select(this).attr("type");
                            switch (type) {
                                case "text" :
                                    if(d3.select(this).classed("condition_input")){
                                        editedItem.updatedValues.condition = this.value;
                                    }else if(d3.select(this).classed("matcher_input")){
                                        editedItem.updatedValues.matcher = this.value;
                                    }
                                    break;
                                case "checkbox" :
                                    if(d3.select(this).classed("silent_input")){
                                        editedItem.updatedValues.silent = this.checked;
                                    }
                                    break;
                                default:
                            }
                        });

                        if(!d3.select(this.parentNode.parentNode).classed("user_delete")){
                            conditionsToEdit.push(editedItem);
                        }
                    });

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
                    if(conditionsToDelete.length > 0){
                        delete_transition(d,conditionsToDelete,context);
                    }

                    edit_frontend_object(context.getData);
                    undo.addToStack(context.getData);
                    swal.close();   // close sweetalert prompt window
                }else if(inputValue === false){  // cancel
                    return false;
                }else if(inputValue === ""){
                    swal.showInputError("error");
                    return false;
                }
            });
            d3.selectAll(".custom_swal_delete").each(function(){
                d3.select(this)
                    .on("click",function(){
                        d3.select(this.parentNode).classed("user_delete",true);
                    });
            });
            d3.selectAll(".condition_display input").each(function(){
                d3.select(this)
                    .on("change",function(){
                        d3.select(this.parentNode.parentNode).classed("user_edited",true);
                    });
            });

            function displayTransitionsAsList(d){
                var html = "<div class='transition_title'>"+d.source.name + " => "+d.target.name+"</div>";

                html += "<div class='header_transition'>"+
                            "<span class='header_condition'>condition</span>"+
                            "<span class='header_matcher'>matcher</span>"+
                            "<span class='header_silent'>silent</span>"+
                        "</div>";

                if(d.conditions){
                    d.conditions.forEach(function(condition,index){
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
        }
});
