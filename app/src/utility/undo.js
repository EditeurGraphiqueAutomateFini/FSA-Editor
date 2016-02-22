define(function(){
    //private
    var maxStateSave = 10;
    var stack = [];

    //public
    function displayStack(){
        console.log(stack);
        /*for(var i=0;i<this.stack.lenght;i++){
            console.log(this.stack[i]);
        }*/
    }
    function addToStack(state){
        //tests
        //
    }

    //return (reveal) public methods
    return{
        "displayStack" : displayStack,
        "addToStack" : addToStack
    }

});
