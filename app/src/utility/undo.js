/**
*   stack to undo or redo changes
*   @module utility/undo - a module that handle a stack of the application states
*/
define(function(){
    /** the maximum number of state save*/
    var maxStateSave = 50;
    var rollingBack = false;
    var rollingBackCount = 0;
    var undoQueue = [];

    /**
    *   a function to know if the stack is full or not
    *   @return {boolean} - true if the stack is full
    *   @see module:utility/undo
    */
    function stackFull(){
        return (undoQueue.length === maxStateSave);
    }

    /**
    *   a function to know if the stack is empty or not
    *   @return {boolean} - true if the stack is empty
    *   @see module:utility/undo
    */
    function stackEmpty(){
        return (undoQueue.length === 0);
    }

    /**
    *   a function add an application state to the stack
    *   @param {Object} state - the application state to save
    *   @see module:utility/undo
    */
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

    /**
    *   a function to obtain the last saved state (to roll back)
    *   @returns {Object} - the last saved state (to go back one step)
    *   @see module:utility/undo
    */
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

    /**
    *   a function to obtain the next saved state (to roll forth)
    *   @returns {Object} - the next saved state (to go forth one step)
    *   @see module:utility/undo
    */
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
