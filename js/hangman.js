/*
    The main script file that will run everything once the page has finished 
    loading.
*/

function _dev1() {
    sp1 = new SinglePlayerGame(Hangman.uiCallback, SinglePlayerGame.categories[0]);
    Hangman.activeGameMode = sp1;
    sp1.start();
    
    sp1.guessObj.tryLetter("x");
    sp1.guessObj.tryLetter("q");
}

let Hangman = {
    ui: DefaultUI,
    uiCallback: DefaultUICallback,
    activeGameMode: null
};

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
    this.ui.init(this);
    this.uiCallback.setUI(this.ui);
    _dev1();
};

Hangman.reset = function() {
    this.activeGameMode = null;
};

window.onload = Hangman.start.bind(Hangman);