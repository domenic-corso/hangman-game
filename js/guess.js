function Guess(uiCallback) {
    this.uiCallback = uiCallback;
    
    this.word = "";
    this.guessableLetters = 0;
    this.revealedLetters = 0;
    this.hintsRemaining = 0;
    
    this.incorrectLetters = [];
    this.correctLetters = [];
    
    this.guessed = false;
}

Guess.prototype.setWord = function(word, hints) {
    this.word = word;
    this.hintsRemaining = hints;
    this.uiCallback.updateGuess(this);
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
*/
Guess.prototype.checkForCompletion = function() {
    
};

/*
    A random letter from the word should be picked and then passed to the 
    'tryLetter()' method which will handle the rest.
*/
Guess.prototype.hint = function() {
    
};