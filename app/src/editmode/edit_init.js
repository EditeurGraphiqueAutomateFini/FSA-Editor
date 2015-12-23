define(function(require){
    return{
        init: function(svg,force,getData,links){
            var delete_state = require("editmode/delete_state"),
                delete_references = require("editmode/delete_references"),
                context_menu = require("menu/context_menu");

            d3.selectAll("circle").each(function(){
                d3.select(this).on("contextmenu",function(d){
                    switch (context_menu) {
                        case "delete":
                            deleteState(d);
                            break;
                        default:
                            deleteState(d);
                    }
                });
            });
            //get state information
            function deleteState(d){
                d3.event.preventDefault();
                swal({
                    title: "Delete this state?",
                    text: "Transition related to this state will be deleted too",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it",
                    closeOnConfirm: false
                },function(){
                    delete_state(d.index,{svg,force,getData,links});
                    delete_references(d.name,getData);
                    swal("Deleted!", "The state \""+d.name+"\" has been deleted.", "success");
                });
            }
        }
    }
});
