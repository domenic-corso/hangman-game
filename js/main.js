/*
    The main script file that will run everything once the page has finished 
    loading.
*/

window.onload = runHangman;

testGuess1 = null;

function runHangman() {
    _sample1();
}

function _sample1() {
    let myWord = "dog";
    let myHints = 1;
    
    let UI = null;
    let uiCallback = new UICallback(UI);
    
    let gameMode = new SinglePlayerGame(SinglePlayerGame.Difficulties.EASY);
    
    testGuess1 = new Guess(uiCallback, gameMode);
    
    testGuess1.setWord(myWord, myHints);
}