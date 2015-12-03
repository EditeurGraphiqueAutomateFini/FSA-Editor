define(function(){
    return{
        displayObject : function(object,selector){      //displays a JS object on screen; object : array of object to display, selector : html tag collection to display the object in
            //todo gerer objets de plus d'un niveau de profondeur
            var objString = '';     //string which will contain the written object
            var indent = 20;    //indent in px

            for(var i=0;i<object.length;i++){   //iteration over the object array
                 //each object in the object array begins with a curl
                objString+='<span style="padding-left:'+indent+'px'+';"></span>{<br/>';
                for (key in object[i]){
                    if(object[i].hasOwnProperty(key)){
                        objString+='<span style="padding-left:'+indent*2+'px'+';"></span>';
                        if(typeof(object[i][key])=='string'){
                            objString+=key+' : '+'\''+object[i][key]+'\'';
                        }else if(typeof(object[i][key])=='object'){
                            objString+=key+' : ['+object[i][key]+']';
                        }
                        else{
                            objString+=key+' : '+object[i][key];
                        }
                        objString+=",<br/>";
                    }
                }
                //removing last coma
                if(objString.charAt(objString.length-6)==','){
                    objString=objString.slice(0,-6)+objString.slice(-5);
                };
                //removing last backspace
                if(objString.slice(-5)=="<br/>"){
                    objString=objString.slice(0,-5);
                }
                //each object in the object array ends with a curl
                objString+='<br/><span style="padding-left:'+indent+'px'+';"></span>}';
                if(i!=object.length-1){
                    objString+='<br/>';
                }
            }
            $(selector).html('{<br/>'+objString+'<br/>}');
            if($(selector).parent().find('textarea#objectArea').size()>0){
                $(selector).parent().find('textarea#objectArea').val(JSON.stringify(object));
            }
        }
    }
})
