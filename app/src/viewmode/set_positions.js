//fonction pour positionner les cercles sans coordonnées
define(function(){
    return function(states){
	
        var gap 			= 	200;
		var nbRecursive 	= 	0;
		var i;
		
		states["start"].x = gap;
		states["start"].y = gap;
		
        for(var state in states){
		
		
			console.log(states[state].name+"("+states[state].x+";"+states[state].y+")");
			
			if(states[state].name != "success" && states[state].name != "error") {
			
				console.log("Nombre de transition de "+states[state].name+" : "+states[state].transitions.length);

				for(i=0;i<states[state].transitions.length;i++) {
				
					if(states[states[state].transitions[i].target].name != states[state].name) {
					
						if(states[states[state].transitions[i].target].x == 0) {
							states[states[state].transitions[i].target].x = states[state].x + gap;
						}
						
						if(i != nbRecursive) {
							states[states[state].transitions[i].target].y = states[state].y + gap * (states[state].transitions.length-i);
						} else {
							states[states[state].transitions[i].target].y = states[state].y;
						}
						console.log(i+" : "+states[states[state].transitions[i].target].name);
						
					} else {
						nbRecursive++;
					}
					
				}
				
				nbRecursive = 0;
				
			}
			console.log("------------------");
        }
    }
})
