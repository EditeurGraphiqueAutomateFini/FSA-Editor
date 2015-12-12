//donnes de tests cercles lié
define(function(){
    return [
        {
            //unique id
            //object to which this is bound
            uniqueId:0,
            boundTo:[1],
            //cx:30,
            //cy:30,
            r:20,
            fill:'blue'
        },
        {
            uniqueId:1,
            boundTo:[2],
            cx:120,
            cy:120,
            r:40,
            fill:'red'
        },
        {
            uniqueId:2,
            boundTo:[2,1],
            cx:210,
            cy:210,
            r:20,
            fill:'green'
        },
        {
            uniqueId:3,
            boundTo:[1],
            cx:210,
            cy:30,
            r:20,
            fill:'pink'
        }
    ]
});
