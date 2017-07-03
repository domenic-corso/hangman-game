/*
    The main script file that will run everything once the page has finished 
    loading.
*/

/* Dev */
function _test1() {
    myTP = new TwoPlayerGame(new UICallback(null));
    myTP.setPlayer1("%Domenic");
    myTP.setPlayer2("Johnny");
    myTP.start();
    
    Hangman.activeGameMode = myTP;
}

function _test2() {
    let callback = DefaultUICallback;
    callback.setUI(DefaultUI);
    
    let category = SinglePlayerGame.categories[0];
    
    mySP = new SinglePlayerGame(callback, category);
    mySP.start();
    
    Hangman.activeGameMode = mySP;
}

let Hangman = {
    ui: DefaultUI,
    uiCallback: DefaultUICallback,
    activeGameMode: null
};

Hangman.start = function() {
    this.ui.init(this);
    this.uiCallback.setUI(this.ui);
    this.loadCategories();
};

Hangman.loadCategories = function() {
    JSAK.AJAX.httpGET("data/categories.json", {}, function(respData) {
        SinglePlayerGame.categories = JSON.parse(respData);
        Hangman.loadGUI();
    });
};

Hangman.loadGUI = function() {
    /* Dev */
};

window.onload = Hangman.start.bind(Hangman);