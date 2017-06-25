/*
    The main script file that will run everything once the page has finished 
    loading.
*/

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
};

window.onload = Hangman.start.bind(Hangman);