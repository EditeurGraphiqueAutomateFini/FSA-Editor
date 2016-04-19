define(function(){
    return function(d){
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
    };
});
