define(function(){
    return{
        //cleans the set of data to obtain sendable/displayable data
        cleanData : function(getData){
            var endPostData = {
                states : {}
            };

            if(getData.allow_overlap){endPostData.allow_overlap=getData.allow_overlap;}
            for(state in getData.states){
                if(getData.states.hasOwnProperty(state)){
                    endPostData.states[state]={};
                    for(key in getData.states[state]){
                        if(getData.states[state].hasOwnProperty(key)){
                            if(key ==="max_noise" || key ==="transitions" || key==="terminal" || key==="graphicEditor"){
                                endPostData.states[state][key] = getData.states[state][key];
                            }
                        }
                    }
                }
            }

            return endPostData;
        }
    }
});
