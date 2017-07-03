let DefaultUICallback = {
    ui: null
};

DefaultUICallback.setUI = function(ui) {
    this.ui = ui;
};

DefaultUICallback.updateGuess = function(guessObj) {
    let gameplayPanel = this.ui.panels.gameplay;
    
    this.ui.showPanel(gameplayPanel);
    
    gameplayPanel.updateWordProgress(guessObj.word, guessObj.wordProgress);
    gameplayPanel.updateIncorrectLetters(guessObj.incorrectLetters);
    gameplayPanel.singlePlayerMode(guessObj.gameMode instanceof SinglePlayerGame);
    gameplayPanel.hintButtonEnabled(!guessObj.tooLateToUseHint());
    gameplayPanel.updateHints(guessObj.hintsRemaining);
    gameplayPanel.setOverallState(guessObj.getOverallState());
    gameplayPanel.nextRoundButtonEnabled(guessObj.gameMode.roundFinished);
};