let MenuPanel = {
    e: {
        panel: document.getElementById("mp-menu"),
        btnSinglePlayer: document.getElementById("menu-btn-single-player"),
        btnTwoPlayer: document.getElementById("menu-btn-two-player"),
        btnViewCode: document.getElementById("menu-btn-view-code")
    },
    evtCallbacks: {
        pressedSinglePlayer: function(e) {
            console.info("Single Player pressed.");
        },
        pressedTwoPlayer: function(e) {
            console.info("Two Player pressed.");
        },
        pressedViewCode: function(e) {
            console.info("View Code pressed.");
        }
    }
};

MenuPanel.init = function() {
    this.addEventListeners();
};

MenuPanel.onShow = function() {
    
};

MenuPanel.addEventListeners = function() {
    this.e.btnSinglePlayer.addEventListener("click", this.evtCallbacks.pressedSinglePlayer);
    this.e.btnTwoPlayer.addEventListener("click", this.evtCallbacks.pressedTwoPlayer);
    this.e.btnViewCode.addEventListener("click", this.evtCallbacks.pressedViewCode);
};