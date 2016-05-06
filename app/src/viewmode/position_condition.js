var coefficient = 0.2;

module.exports = {
    setXPosition : function(d){
        return (d.source === d.target ? 20 : Math.round((d.target.y - d.source.y) * (coefficient)));
    },
    setYPosition : function(d){
        return (d.source === d.target ? 0 : Math.round((d.target.x - d.source.x) * (-coefficient)));
    }
};
