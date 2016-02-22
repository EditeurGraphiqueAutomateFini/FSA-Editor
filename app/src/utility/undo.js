define(function(){
    //private
    var maxStateSave = 10;
    var undoStack = [];
    function stackFull(stack){
        return (stack.length===maxStateSave);
    }
    function stackEmpty(){

    }

    //public
    function displayStack(){
        console.log(undoStack);
    }
    function addToStack(state){
        if(stackFull(undoStack)){
            undoStack.shift();
        }
        undoStack.push(state);
    }
    function deleteFromStack(){
        
    }


    //return (reveal) public methods
    return{
        "displayStack" : displayStack,
        "addToStack" : addToStack
    }

});
