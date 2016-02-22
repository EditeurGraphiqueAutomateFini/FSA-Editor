//attention ici on essaie de créer un concept bâtard entre pile et file
//"pfile" ou "fpile" ? "FLIFO" ? moment difficile...
define(function(require){
    //private
    var maxStateSave = 10;
    var rollingBack = false,
        rollingBackCount = 0;
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
        rollingBack = false;
        rollingBackCount = 0;

        var stateClone = _.cloneDeep(state);

        if(stackFull(undoStack)){
            undoStack.shift();
        }
        undoStack.push(stateClone);
    }
    function deleteFromStack(){

    }
    function rollBack(){
        console.log(rollingBackCount);
        console.log(undoStack);
        rollingBack = true;
        if( rollingBackCount > maxStateSave ){
            rollingBackCount = maxStateSave;
        }else{
            rollingBackCount++;
        }
        return undoStack[(undoStack.length)-(1+rollingBackCount)];
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
