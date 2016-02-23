//attention ici on essaie de créer un concept bâtard entre pile et file
//"pfile" ou "fpile" ? "FLIFO" ? moment difficile...
define(function(require){
    //private
    var maxStateSave = 10;
    var rollingBack = false,
        rollingBackCount = 0;
    var undoQueue = [];

    function stackFull(stack){
        return (stack.length===maxStateSave);
    }
    function stackEmpty(){
        return (stack.length===0);
    }

    //public
    function displayStack(){
        console.log(undoQueue);
    }
    function addToStack(state){
        if(rollingBack){
            var reroll = _.cloneDeep(undoQueue[(undoQueue.length)-(1+rollingBackCount)]);
            undoQueue = [reroll];
            rollingBack = false;
            rollingBackCount = 0;
        }
        var stateClone = _.cloneDeep(state);

        if(stackFull(undoQueue)){
            undoQueue.shift();
        }
        undoQueue.push(stateClone);
    }
    function deleteFromStack(){

    }
    function rollBack(){
        if(!rollingBack){
            rollingBack = true;
        }
        if( rollingBackCount >= undoQueue.length-1 ){
            rollingBackCount =  undoQueue.length-1;
        }else{
            rollingBackCount++;
        }
            //console.log(rollingBack,undoQueue.length,rollingBackCount,undoQueue);
        return _.cloneDeep(undoQueue[(undoQueue.length)-(1+rollingBackCount)]);
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
