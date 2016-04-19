// attention ici on essaie de créer un concept bâtard entre pile et file
// "pfile" ou "fpile" ? "FLIFO" ? moment difficile...
define(function(){
    // private
    var maxStateSave = 50,
        rollingBack = false,
        rollingBackCount = 0,
        undoQueue = [];

    function stackFull(){
        return (undoQueue.length === maxStateSave);
    }
    function stackEmpty(){
        return (undoQueue.length === 0);
    }

    // public
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
    function rollBack(){
        if(!rollingBack){
            rollingBack = true;
        }
        if(rollingBackCount >= undoQueue.length-1){
            rollingBackCount = undoQueue.length-1;
        }else{
            rollingBackCount++;
        }
        return _.cloneDeep(undoQueue[(undoQueue.length)-(1+rollingBackCount)]);
    }
    function rollForth(){
        if(rollingBack){
            if(rollingBackCount <= 0){
                rollingBackCount = 0;
            }else{
                rollingBackCount--;
            }
            return _.cloneDeep(undoQueue[(undoQueue.length)-(1+rollingBackCount)]);
        }
        return true;
    }

    // return (reveal) public methods
    return{
        "addToStack" : addToStack,
        "rollBack" : rollBack,
        "rollForth" : rollForth,
        "stackEmpty" : stackEmpty
    };
});
