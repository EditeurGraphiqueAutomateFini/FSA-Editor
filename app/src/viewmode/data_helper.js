define(function(){
    return{
        //cleans the set of data to obtain sendable/displayable data
        cleanData : function(getData){
            var endPostData = {
                states : {}
            };

            if(getData.allow_overlap){endPostData.allow_overlap=getData.allow_overlap;}
            if(getData.state_defaults){endPostData.state_defaults=getData.state_defaults;}
            if(getData.default_matcher){endPostData.default_matcher=getData.default_matcher;}

            for(state in getData.states){
                if(getData.states[state] && getData.states.hasOwnProperty(state)){
                    endPostData.states[state]={};
                    for(key in getData.states[state]){
                        if(getData.states[state].hasOwnProperty(key)){
                            //condition giving the set of properties we want to keep
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
