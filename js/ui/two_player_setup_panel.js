let TwoPlayerSetupPanel = {
    hangmanGame: null,
    parentUI: null,
    e: {
        panel: document.getElementById("mp-two-player-setup"),
        p1NameInput: document.getElementById("player1-name-input"),
        p2NameInput: document.getElementById("player2-name-input"),
        startButton: document.getElementById("two-player-start-btn")
    },
    evtCallbacks: {
        startButtonPressed: function(e) {
            let p1NameField = this.e.p1NameInput;
            let p2NameField = this.e.p2NameInput;
            
            /* Assume all is valid */
            let bothValid = true;
            this.parentUI.inputFieldValid(p1NameField);
            this.parentUI.inputFieldValid(p2NameField);
            
            let p1Name = p1NameField.value.trim();
            let p2Name = p2NameField.value.trim();
            
            if (!HangmanHelper.isValidName(p1Name)) {
                bothValid = false;
                this.parentUI.inputFieldError(p1NameField);
            }
            
            if (!HangmanHelper.isValidName(p2Name)) {
                bothValid = false;
                this.parentUI.inputFieldError(p2NameField);
            }
            
            if (bothValid) {
                let tpGame = new TwoPlayerGame(this.hangmanGame.uiCallback);
                
                tpGame.setPlayer1(p1Name);
                tpGame.setPlayer2(p2Name);
                
                this.hangmanGame.activeGameMode = tpGame;
                this.hangmanGame.activeGameMode.start();
                
                this.parentUI.showPanel(this.parentUI.panels.enterWord);
            }
        }
    }
};

TwoPlayerSetupPanel.init = function(hangmanGame, parentUI) {
    this.hangmanGame = hangmanGame;
    this.parentUI = parentUI;
    this.addEventListeners();
};

TwoPlayerSetupPanel.onShow = function() {
    
};

TwoPlayerSetupPanel.addEventListeners = function() {
    this.e.startButton.addEventListener("click", this.evtCallbacks.startButtonPressed.bind(this));
};

TwoPlayerSetupPanel.areNamesValid = function() {
    let p1Name = this.e.p1NameInput.value.trim();
    let p2Name = this.e.p2NameInput.value.trim();
};