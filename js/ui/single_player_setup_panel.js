let SinglePlayerSetupPanel = {
    hangmanGame: null,
    e: {
        panel: document.getElementById("mp-single-player-setup"),
        buttonsCont: document.getElementById("mpc-category-buttons-cont")
    },
    evtCallbacks: {}
};

SinglePlayerSetupPanel.init = function(hangmanGame) {
    this.hangmanGame = hangmanGame;
    this.addEventListeners();
};

SinglePlayerSetupPanel.onShow = function() {
    let categories = SinglePlayerGame.categories;
    
    JSAK.removeAllChildren(this.e.buttonsCont);
    
    for (let i = 0; i < categories.length; i++) {
        this.e.buttonsCont.appendChild(this.getCategoryButton(categories[i]));
    }
};

SinglePlayerSetupPanel.addEventListeners = function() {};

SinglePlayerSetupPanel.getCategoryButton = function(category) {
    let elem = document.createElement("button");
    
    elem.className = "mpc-menu-button";
    elem.innerHTML = category.name;
    
    elem.addEventListener("click", function() {
        let spGame = new SinglePlayerGame(this.hangmanGame.uiCallback, category);
        
        this.hangmanGame.activeGameMode = spGame;
        this.hangmanGame.activeGameMode.start();
    }.bind(this));
    
    return elem;
};