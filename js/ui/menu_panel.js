let MenuPanel = {
    parentUI: null,
    e: {
        panel: document.getElementById("mp-menu"),
        btnSinglePlayer: document.getElementById("menu-btn-single-player"),
        btnTwoPlayer: document.getElementById("menu-btn-two-player"),
        btnViewCode: document.getElementById("menu-btn-view-code")
    },
    evtCallbacks: {
        pressedSinglePlayer: function(e) {
            this.parentUI.showPanel(this.parentUI.panels.singlePlayerSetup);
        },
        pressedTwoPlayer: function(e) {
            this.parentUI.showPanel(this.parentUI.panels.twoPlayerSetup);
        },
        pressedViewCode: function(e) {
            window.open("https://bitbucket.org/domcorso/simple-hangman");
        }
    }
};

MenuPanel.init = function(hangmanGame, parentUI) {
    this.parentUI = parentUI;
    this.addEventListeners();
};

MenuPanel.onShow = function() {
    
};

MenuPanel.addEventListeners = function() {
    this.e.btnSinglePlayer.addEventListener("click", this.evtCallbacks.pressedSinglePlayer.bind(this));
    this.e.btnTwoPlayer.addEventListener("click", this.evtCallbacks.pressedTwoPlayer.bind(this));
    this.e.btnViewCode.addEventListener("click", this.evtCallbacks.pressedViewCode.bind(this));
};