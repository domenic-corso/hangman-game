/*
    The main script file that will run everything once the page has finished 
    loading.
*/

window.onload = runHangman;

testUICallback = new UICallback(null);
testGuess1 = null;
testSP1 = null;

function runHangman() {
    _sample2();
}

function _sample1() {
    let myWord = "dog";
    let myHints = 1;
    
    testGuess1 = new Guess(testUICallback, null);
    testGuess1.setWord(myWord, myHints);
}

function _sample2() {
    let foodCategory = {
        name: "Food",
        words: [
            "Chicken Parmagiana",
            "Fried Rice",
            "Lasagna",
            "Pizza"
        ]
    };
    
    testSP1 = new SinglePlayerGame(testUICallback, foodCategory);
    
    testSP1.start();
}