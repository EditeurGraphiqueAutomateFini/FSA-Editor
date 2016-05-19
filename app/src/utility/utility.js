/**
*   A set of utility functions
*   @module utility/utility
*/
define(function(){
    // TODO optimisation du code
    return{
        /**
        *   displays a JS object on screen (right pannel)
        *   @param {Object} object - array of object to display
        *   @param {number} level - current level of recursivity
        *   @returns {string} objString - the html content to render
        */
         // TODO reussir a se passer du parametre "level", trouver un moyen de compter les appels recursif
        displayObject : function(object,level){
            // string which will contain the written object
            var objString = '';
            // indent in px
            var indent = 20;
            var key;
            var arrayItem;
            var arrayItemType;
            var j = 0;

            level++;

            // iteration over the object array
            for(var i=0; i < object.length; i++){
                // each object in the object array begins with a curl
                objString += '<span style="padding-left:'+indent+'px'+';"></span>{<br/>';
                for (key in object[i]){
                    if(object[i].hasOwnProperty(key)){
                        // the property
                        var objProperty = object[i][key];

                        // we don't want to display "graphicEditor" property to keep it simple
                        if(key != "graphicEditor"){
                            objString += '<span style="padding-left:'+(indent*level+indent)+'px'+';"></span>';
                            // display a string w/ simple quotes
                            if(typeof(objProperty) == 'string'){
                                objString += key+' : '+'\''+objProperty+'\'';
                            // recursively display the content of a litteral object
                            }else if(Object.prototype.toString.call(objProperty) == '[object Object]'){
                                objString += key+' : '+this.displayObject([objProperty],level);
                            // displays an array
                            }else if(Object.prototype.toString.call(objProperty)=='[object Array]'){
                                objString += key+' : ['+'<br/><span style="padding-left:'+(indent*(level+2))+'px'+';"></span>';
                                for(j=0; j < objProperty.length; j++){

                                    arrayItem = objProperty[j];
                                    arrayItemType = Object.prototype.toString.call(arrayItem);

                                    if(arrayItemType == '[object Object]' || arrayItemType == '[object Array]'){
                                        if(j == objProperty.length-1){
                                            objString += this.displayObject([arrayItem],level+2);
                                        }else{
                                            objString += this.displayObject([arrayItem],level+2)+',<br/><span style="padding-left:'+(indent*(level+2))+'px'+';"></span>';
                                        }
                                    }else if (arrayItemType == 'string'){
                                        if(j == objProperty.length-1){
                                            objString += '\''+arrayItem+'\'';
                                        }else{
                                            objString += '\''+arrayItem+'\',<br/><span style="padding-left:'+(indent*(level+2))+'px'+';"></span>';
                                        }
                                    }else{
                                        if(j == objProperty.length-1){
                                            objString += arrayItem;
                                        }else{
                                            objString += arrayItem+',<br/><span style="padding-left:'+(indent*(level+2))+'px'+';"></span>';
                                        }
                                    }
                                }
                                objString += '<br/><span style="padding-left:'+(indent*level+indent)+'px'+';"></span>'+']';
                            }
                            else{
                                objString += key+' : '+objProperty;
                            }
                            objString += ",<br/>";
                        }
                    }
                }

                // removing last coma
                if(objString.charAt(objString.length-6) == ','){
                    objString = objString.slice(0,-6)+objString.slice(-5);
                }

                // removing last backspace
                if(objString.slice(-5) == "<br/>"){
                    objString = objString.slice(0,-5);
                }

                // each object in the object array ends with a curl
                objString += '<br/><span style="padding-left:'+(indent*level)+'px'+';"></span> }';
                if(i != object.length-1){
                    objString += '<br/>';
                }
            }
            return objString;
        },

        /**
        *   display the given object in a html container by calling "displayObject" method
        *   @param {Object} data - the global data to display
        */
        frontEndObject : function(data){
            var displayZone = "#object_container_left";

            $(displayZone).html('{<br/>'+this.displayObject(data,0)+'<br/>}');

            // display object in a textarea (for copy/paste)
            if($(displayZone).parents().find('textarea#objectArea').size() > 0){
                $(displayZone).parents().find('textarea#objectArea').val(function(){
                    var text = "";

                    for(var i=0; i < data.length; i++){
                        text += JSON.stringify(data[i]);
                    }
                    return text;
                });
            }
        }
    };
});
