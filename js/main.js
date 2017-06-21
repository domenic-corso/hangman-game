/*
    The main script file that will run everything once the page has finished 
    loading.
*/

window.onload = runHangman;

function runHangman() {
    _sample1();
}

function _sample1() {
    let myWord = "house";
    let myHints = 1;
    
    let UI = null;
    let uiCallback = new UICallback(UI);
    
    let guess = new Guess(uiCallback);
    
    guess.setWord(myWord, myHints);
}