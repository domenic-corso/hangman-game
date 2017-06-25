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

let Hangman = {};

Hangman.start = function() {
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
    _test1();
};

window.onload = Hangman.start.bind(Hangman);