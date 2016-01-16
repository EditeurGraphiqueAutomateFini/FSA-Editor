//global utility functions
//ne pas être trop regardant, accepter ce code tel qu'il est
define(function(){
    return{
         //displays a JS object on screen; object : array of object to display
         //todo reussir a se passer du param level, trouver un moyen de compter les appels recursif (demander a jeanseba le roi de lalgo)
        displayObject : function(object,level){
            var objString = '';     //string which will contain the written object
            var indent = 20;    //indent in px
            level++;
            for(var i=0;i<object.length;i++){   //iteration over the object array
                 //each object in the object array begins with a curl
                objString+='<span style="padding-left:'+indent+'px'+';"></span>{<br/>';
                for (key in object[i]){
                    if(object[i].hasOwnProperty(key)){
                        var objProperty = object[i][key];
                        objString+='<span style="padding-left:'+(indent*level+indent)+'px'+';"></span>';
                        if(typeof(objProperty)=='string'){
                            objString+=key+' : '+'\''+objProperty+'\'';
                        }else if(Object.prototype.toString.call(objProperty)=='[object Object]'){
                            objString+=key+' : '+this.displayObject([objProperty],level);
                        }else if(Object.prototype.toString.call(objProperty)=='[object Array]'){
                            objString+=key+' : ['+'<br/><span style="padding-left:'+(indent*(level+2))+'px'+';"></span>';
                            //moche a refaire /*******************************************************************************************/
                            for(var j=0;j<objProperty.length;j++){
                                var arrayItem = objProperty[j],
                                    arrayItemType = Object.prototype.toString.call(arrayItem);
                                if(arrayItemType =='[object Object]' || arrayItemType=='[object Array]'){
                                    if(j==objProperty.length-1){
                                        objString+=this.displayObject([arrayItem],level+2);
                                    }else{
                                        objString+=this.displayObject([arrayItem],level+2)+',<br/><span style="padding-left:'+(indent*(level+2))+'px'+';"></span>';
                                    }
                                }else if (arrayItemType == 'string'){
                                    if(j==objProperty.length-1){
                                        objString+='\''+arrayItem+'\'';
                                    }else{
                                        objString+='\''+arrayItem+'\',<br/><span style="padding-left:'+(indent*(level+2))+'px'+';"></span>';
                                    }
                                }else{
                                    if(j==objProperty.length-1){
                                        objString+=arrayItem;
                                    }else{
                                        objString+=arrayItem+',<br/><span style="padding-left:'+(indent*(level+2))+'px'+';"></span>';
                                    }
                                }
                            }
                            //moche a refaire /*******************************************************************************************/
                            objString+='<br/><span style="padding-left:'+(indent*level+indent)+'px'+';"></span>'+']';
                        }
                        else{
                            objString+=key+' : '+objProperty;
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
                objString+='<br/><span style="padding-left:'+(indent*level)+'px'+';"></span> }';
                if(i!=object.length-1){
                    objString+='<br/>';
                }
            }
            return objString;
        },
        //display the given object in a html container by calling "displayObject" method
        frontEndObject : function(data){
            var displayZone = "#object_container_left";
            $(displayZone).html('{<br/>'+this.displayObject(data,0)+'<br/>}');
            if($(displayZone).parents().find('textarea#objectArea').size()>0){   // display object in a textarea (for copy/paste)
                $(displayZone).parents().find('textarea#objectArea').val(JSON.stringify(data));
            }
        }
    }
});
