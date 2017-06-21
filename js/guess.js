function Guess(uiCallback, gameMode) {
    this.uiCallback = uiCallback;
    this.gameMode = gameMode;
    
    this.word = "";
    this.guessableLetters = 0;
    this.revealedLetters = 0;
    this.hintsRemaining = 0;
    
    this.wordProgress = [];
    
    this.incorrectLetters = [];
    this.correctLetters = [];
    
    this.complete = false;
}

/*
    A letter can either be not guessed, guessed or be a space character. This
    enum-style object combined with the 'wordProgress' is useful for the UI to 
    display which letters have been guessed.
*/
Guess.LetterStates = {
    GUESSED: 1,
    NOT_GUESSED: 2,
    SPACE: 3
};

Guess.prototype.setWord = function(word, hints) {
    this.word = word;
    this.hintsRemaining = hints;
    this.uiCallback.updateGuess(this);
    
    console.log("SET WORD: " + word);
    console.log("SET HINTS: " + hints);
};

/*
    This function should be called when the user selects a single letter
    to guess. The letter passed in should either end up in 'incorrectLetters'
    or 'correctLetters'.
    
    If the word contains multiple of the same letter, they both should be 
    revealed however only one should be added to the 'correctLetters' array.
*/
Guess.prototype.tryLetter = function(letter) {
    
};

/*
    This should be called at the end of 'tryLetter()', it checks if the player
    has guessed all the letters in the word.
    
    A player has guessed all the letters if 'guessableLetters' is equal to 
    'revealedLetters'.
    
    If a game mode is given, it should also be alerted that the guess is has
    now finished.
*/
Guess.prototype.checkForCompletion = function() {
    
};

/*
    A random letter from the word should be picked and then passed to the 
    'tryLetter()' method which will handle the rest.
*/
Guess.prototype.hint = function() {
    
};