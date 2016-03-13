define(function(){
    return function(d,conditionsToDelete,context){
        var originalConditions = d.condition.split(","),
            newConditions=[];

        originalConditions.forEach(function(condition){
            var toBeDeleted = conditionsToDelete.indexOf(condition);
            if(toBeDeleted===-1){
                newConditions.push(condition);
            }
        });

        d.condition = newConditions.toString();

        //restarting force w/ new nodes and links
        //context.force.start();
    }
});
