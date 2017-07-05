/*
    The main script file that will run everything once the page has finished 
    loading.
*/

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
};

Hangman.reset = function() {
    this.activeGameMode = null;
};

window.onload = Hangman.start.bind(Hangman);