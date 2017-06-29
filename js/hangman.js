/*
    The main script file that will run everything once the page has finished 
    loading.
*/

/* Dev */
function _test1() {
    myTP = new TwoPlayerGame(new UICallback(null));
    myTP.setPlayer1("Domenic");
    myTP.setPlayer2("Johnny");
    myTP.start();
}

function _test2() {
    mySP = new SinglePlayerGame(new UICallback(null), SinglePlayerGame.categories[0]);
    mySP.start();
}

let Hangman = {
    ui: DefaultUI
};

Hangman.start = function() {
    this.ui.init();
    this.loadCategories();
};

Hangman.loadCategories = function() {
    JSAK.AJAX.httpGET("data/categories.json", {}, function(respData) {
        SinglePlayerGame.categories = JSON.parse(respData);
        Hangman.loadGUI();
    });
};

Hangman.loadGUI = function() {
    console.log("Loading GUI...");
    
    /* Dev */
};

window.onload = Hangman.start.bind(Hangman);