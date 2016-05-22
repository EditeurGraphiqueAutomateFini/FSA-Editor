/**
*   Stack to undo or redo changes of the application states
*   @module utility/undo
*/
define(function(){
    var data_helper = require("../viewmode/data_helper");
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
        notifyChange(stateClone);
    }

    /**
    *   a function to obtain the last saved state (to roll back)
    *   @returns {Object} - the last saved state (to go back one step)
    *   @see module:utility/undo
    */
    function rollBack(){
        var rollBackResult;

        if(!rollingBack){
            rollingBack = true;
        }
        if(rollingBackCount >= undoQueue.length-1){
            rollingBackCount = undoQueue.length-1;
        }else{
            rollingBackCount++;
        }

        rollBackResult = _.cloneDeep(undoQueue[(undoQueue.length)-(1+rollingBackCount)]);
        notifyChange(rollBackResult);
        return rollBackResult;
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

    /**
    *   a function to notify when the data has changed
    *   emits the event "fsa_changed" every time the object is changed
    *   new object available in event.detail
    *   @see module:utility/undo
    */
    function notifyChange(newState){
        var fsaChanged = new CustomEvent('fsa_changed',{'detail' : data_helper.cleanData(newState)});
        window.dispatchEvent(fsaChanged);
    }

    // return (reveal) public methods
    return{
        "addToStack" : addToStack,
        "rollBack" : rollBack,
        "rollForth" : rollForth,
        "stackEmpty" : stackEmpty
    };
});
