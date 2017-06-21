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

/*
    Acting like an initialization for the a Guess object, setWord() sets the
    word for this guess as well as defining values for other properties that
    are based off the word.
    
    Steps:
        1. Validate the word and return true/false based on.
        2. Set the word and hint property based on paramaters passed in.
        3. Initialize the 'wordProgress' array to match the word. For example,
           the word "note book" would initialize 'wordProgress' as:
                [NG,NG,NG,NG,SP,NG,NG,NG,NG] (refer to Guess.LetterStates)
*/
Guess.prototype.setWord = function(word, hints) {
    this.word = word;
    this.hintsRemaining = hints;
    
    for (let i = 0; i < this.word.length; i++) {
        let letterState;
        
        if (this.word[i] == " ") {
            letterState = Guess.LetterStates.SPACE;
        }
        else {
            letterState = Guess.LetterStates.NOT_GUESSED;
        }
        
        this.wordProgress[i] = letterState;
    }
    
    this.uiCallback.updateGuess(this);
    
    console.log("SET WORD: " + word);
    console.log("SET HINTS: " + hints);
    console.log("WORD PROGRESS: " + this.wordProgress);
};

/*
    This function should be called when the user selects a single letter
    to guess. The letter passed in should either end up in 'incorrectLetters'
    or 'correctLetters'.
    
    If the word contains multiple of the same letter, they both should be 
    revealed however only one should be added to the 'correctLetters' array.
*/
Guess.prototype.tryLetter = function(letter) {
    console.log("TRYING LETTER: " + letter);
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
    console.log("COMPLETION RESULT: " + this.complete);
};

/*
    A random letter from the word should be picked and then passed to the 
    'tryLetter()' method which will handle the rest.
*/
Guess.prototype.hint = function() {
    console.log("PERFORMING HINT");
};