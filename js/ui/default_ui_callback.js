let DefaultUICallback = {
    ui: null
};

DefaultUICallback.setUI = function(ui) {
    this.ui = ui;
};

DefaultUICallback.updateGuess = function(guessObj) {
    let gameplayPanel = this.ui.panels.gameplay;
    
    /* Switch to the gameplay panel. */
    this.ui.showPanel(gameplayPanel);
    
    /* Update the word progress. */
    gameplayPanel.updateWordProgress(guessObj.word, guessObj.wordProgress);
    
    /* Update the incorrect letters. */
    gameplayPanel.updateIncorrectLetters(guessObj.incorrectLetters);
    
    /* Show gameplay panel in single or two player mode. */
    gameplayPanel.singlePlayerMode(guessObj.gameMode instanceof SinglePlayerGame);
    
    /* Show the amount of hints remaining and deactivate/active button. */
    gameplayPanel.updateHints(guessObj.hintsRemaining);
    
    gameplayPanel.setOverallState(guessObj.getOverallState());
    
    gameplayPanel.nextRoundButtonEnabled(guessObj.gameMode.roundFinished);
};