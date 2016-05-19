/**
*   Functions to handle data cleaning
*   @module viewmode/data_helper
*/
define(function(){
    return{
        /**
        *   cleans the set of data to obtain sendable/displayable data
        *   @param {Object} getData - the data to clean
        *   @returns {Object} endPostData - the cleaned data
        */
        cleanData : function(getData){
            var endPostData = {
                states : {}
            };
            var state;
            var key;

            if(getData.allow_overlap){ endPostData.allow_overlap = getData.allow_overlap; }
            if(getData.state_defaults){ endPostData.state_defaults = getData.state_defaults; }
            if(getData.default_matcher){ endPostData.default_matcher = getData.default_matcher; }

            for(state in getData.states){
                if(getData.states.hasOwnProperty(state) && getData.states[state]){
                    endPostData.states[state] = {};
                    for(key in getData.states[state]){
                        if(getData.states[state].hasOwnProperty(key)){
                            // condition giving the set of properties we want to keep for each state
                            if(
                                key === "default_transition" ||
                                key === "graphicEditor" ||
                                key === "max_duration" ||
                                key ==="max_noise" ||
                                key === "max_total_duration" ||
                                key === "max_total_noise" ||
                                key === "terminal" ||
                                key ==="transitions"
                            ){
                                endPostData.states[state][key] = getData.states[state][key];
                            }
                        }
                    }
                }
            }

            return endPostData;
        }
    };
});
