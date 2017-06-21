function Guess(uiCallback) {
    this.uiCallback = uiCallback;
    
    this.word = "";
    this.guessableLetters = 0;
    this.hintsRemaining = 0;
    
    this.incorrectGuesses = [];
    this.correctGuesses = [];
    
    this.guessed = false;
}

Guess.prototype.setWord = function(word, hints) {
    this.word = word;
    this.hintsRemaining = hints;
    this.uiCallback.updateGuess(this);
};