define(function(require){
    //private
    var viewmode = require("viewmode/view_init");
    var maxStateSave = 10;
    var undoStack = [];
    function stackFull(stack){
        return (stack.length===maxStateSave);
    }
    function stackEmpty(){
        return (stack.length===0);
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
    function rollBack(mode){
        switch (mode) {
            case "view":
                var retrieveState = undoStack[(undoStack.length)-1];
                viewmode.init(viewmode.extractStates([retrieveState]),retrieveState,true);
                break;
            default:
                break;
        }
    }
    function rollForth(){

    }


    //return (reveal) public methods
    return{
        "displayStack" : displayStack,
        "addToStack" : addToStack,
        "rollBack" : rollBack
    }

});
