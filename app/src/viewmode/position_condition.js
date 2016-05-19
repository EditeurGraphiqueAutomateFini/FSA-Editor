var coefficient = 0.2;

/**
*   Functions to set positions for conditions
*   @module viewmode/position_condition
*/
module.exports = {
    /**
    *   return the x-axis position
    *   @param {Object} d - data for the state, supplied by D3
    *   @returns {number} - the the x-axis position
    */
    setXPosition : function(d){
        return (d.source === d.target ? 20 : Math.round((d.target.y - d.source.y) * (coefficient)));
    },

    /**
    *   return the y-axis position
    *   @param {Object} d - data for the state, supplied by D3
    *   @returns {number} - the the y-axis position
    */
    setYPosition : function(d){
        return (d.source === d.target ? 0 : Math.round((d.target.x - d.source.x) * (-coefficient)));
    }
};
