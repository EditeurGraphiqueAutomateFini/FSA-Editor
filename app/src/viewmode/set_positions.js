//fonction pour positionner les cercles sans coordonnées
define(function(){
    return function(states){
        var cpt=0;
        for(var state in states){
            cpt++;
            if(!(states[state].graphicEditor.coordX && states[state].graphicEditor.coordY)){
                states[state].x=(50*cpt);
                states[state].y=states[state].x;
            }
        }
    }
})
