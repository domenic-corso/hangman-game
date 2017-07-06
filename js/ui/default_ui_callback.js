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
    gameplayPanel.disableAllGuessedLetters(guessObj.incorrectLetters.concat(guessObj.correctLetters));
    gameplayPanel.singlePlayerMode(guessObj.gameMode instanceof SinglePlayerGame);
    gameplayPanel.hintButtonEnabled(!guessObj.tooLateToUseHint());
    gameplayPanel.updateHints(guessObj.hintsRemaining);
    gameplayPanel.setOverallState(guessObj.getOverallState());
    
    if (guessObj.getOverallState() == Guess.OverallState.FAIL) {
        gameplayPanel.revealFullWord(guessObj.word);
    }
    
    gameplayPanel.nextRoundButtonEnabled(guessObj.gameMode.roundFinished);
    
    if (guessObj.gameMode instanceof TwoPlayerGame) {
        gameplayPanel.setPlayer1Name(guessObj.gameMode.player1.name);
        gameplayPanel.setPlayer1Points(guessObj.gameMode.player1.points);
        gameplayPanel.setPlayer2Name(guessObj.gameMode.player2.name);
        gameplayPanel.setPlayer2Points(guessObj.gameMode.player2.points);
    }
};