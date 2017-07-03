let EnterWordPanel = {
    hangmanGame: null,
    parentUI: null,
    e: {
        panel: document.getElementById("mp-enter-word"),
        wordInput: document.getElementById("enter-word-input"),
        numHintsInput: document.getElementById("num-hints-input"),
        nextRoundButton: document.getElementById("two-player-next-round-btn"),
        playerName: document.getElementById("enter-word-player-name")
    },
    evtCallbacks: {
        /*
            Show the recommended number of hints as the player types in the
            word. Don't show a number if the word is invalid.
        */
        wordInpChanged: function(e) {
            let enteredWord = this.e.wordInput.value.trim();
            
            this.clearRecommendedHints();
            
            let recommendedHints = SinglePlayerGame.calculateNumHints(enteredWord);
            
            if (HangmanHelper.isValidWord(enteredWord)) {
                this.updateRecommendedHints(recommendedHints);
            }
        },
        startButtonPressed: function(e) {
            let enteredWord = this.e.wordInput.value.trim();
            let enteredHintsText = this.e.numHintsInput.value.toString();
            
            /* Assume valid. */
            let bothValid = true;
            this.parentUI.inputFieldValid(this.e.wordInput);
            this.parentUI.inputFieldValid(this.e.numHintsInput);
            
            if (!HangmanHelper.isValidWord(enteredWord)) {
                bothValid = false;
                this.parentUI.inputFieldError(this.e.wordInput);
            }
            
            /* Check if number of hints entered is actually a number. */
            if (!(/\d/.test(enteredHintsText)) || parseInt(enteredHintsText) > Guess.MAX_HINTS) {
                bothValid = false;
                this.parentUI.inputFieldError(this.e.numHintsInput);
            }
            
            /* Begin the round if a valid word and number of hints is given. */
            if (!bothValid) { return; }
            
            this.parentUI.showPanel(this.parentUI.panels.gameplay);
            this.hangmanGame.activeGameMode.nextRound(enteredWord, parseInt(enteredHintsText));
            
        }
    }
};

EnterWordPanel.init = function(hangmanGame, parentUI) {
    this.hangmanGame = hangmanGame;
    this.parentUI = parentUI;
    
    this.addEventListeners();
};

EnterWordPanel.onShow = function() {
    /* Clear both inputs when this panel is shown. */
    this.e.wordInput.value = null;
    this.e.numHintsInput.value = null;
    this.clearRecommendedHints();
    
    /* Show who is currently selecting a word. */
    this.e.playerName.innerHTML = this.hangmanGame.activeGameMode.guessingNext().name + ",";
    
};

EnterWordPanel.addEventListeners = function() {
    this.e.wordInput.addEventListener("input", this.evtCallbacks.wordInpChanged.bind(this));
    this.e.nextRoundButton.addEventListener("click", this.evtCallbacks.startButtonPressed.bind(this));
};

EnterWordPanel.updateRecommendedHints = function(num) {
    this.e.numHintsInput.setAttribute("placeholder", "Recommended: " + num);
};

EnterWordPanel.clearRecommendedHints = function() {
    this.e.numHintsInput.removeAttribute("placeholder");
};