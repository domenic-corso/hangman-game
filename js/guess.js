function Guess(uiCallback, gameMode) {
    this.uiCallback = uiCallback;
    this.gameMode = gameMode;
    
    this.word = "";
    this.hintsRemaining = 0;
    
    this.guessableLetters = 0;
    this.revealedLetters = 0;
    this.leftToGuess = 0;
    this.chancesLeft = 6;
    
    this.wordProgress = [];
    this.incorrectLetters = [];
    this.correctLetters = [];
    
    this.complete = false;
}

/* You need to have >= MIN_LEFT_TO_HINT letters left to guess to hint() */
Guess.MIN_LEFT_TO_HINT = 2;

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
    See Guess.MIN_LEFT_TO_HINT for description.
*/
Guess.prototype.tooLateToUseHint = function() {
    return (this.leftToGuess < Guess.MIN_LEFT_TO_HINT);
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
    
    This function will return true on success and false on failure.
*/
Guess.prototype.setWord = function(word, hints) {
    /* Ensure a valid word has been given */
    if (!HangmanHelper.isValidWord(word)) {
        console.error("An invalid word was given: " + word);
        return false;
    }
    
    /* Assign property values */
    this.word = word.trim().toLowerCase();
    this.hintsRemaining = hints;
    
    /* Setup 'wordProgress' array. */
    for (let i = 0; i < this.word.length; i++) {
        /* Assume the character is a letter. */
        let letterState = Guess.LetterStates.NOT_GUESSED;
        
        /* Check if character is a space. */
        if (this.word[i] == " ") {
            letterState = Guess.LetterStates.SPACE;
        }
        
        this.wordProgress[i] = letterState;
    }
    
    this.guessableLetters = HangmanHelper.getAmountOfGuessableLetters(this.word);
    
    /*
        At the start, the amount of letters left to guess is equal to how
        many are guessable.
    */
    this.leftToGuess = this.guessableLetters;
    
    this.uiCallback.updateGuess(this);
    
    return true;
};

/*
    This function should be called when the user selects a single letter
    to guess. The letter passed in should either end up in 'incorrectLetters'
    or 'correctLetters'.
    
    If the word contains multiple of the same letter, they both should be 
    revealed however only one should be added to the 'correctLetters' array.
*/
Guess.prototype.tryLetter = function(letter) {
    if (this.completeOrOutOfChances()) return;
    
    let matchFound = false;
    
    /* Before using the letter, ensure it is lowercase */
    letter = letter.toLowerCase();
    
    /* Ensure a letter is given. */
    if (!HangmanHelper.isLetter(letter)) {
        console.error("A letter was not given.");
        return;
    }
    
    /* Don't do anything if this letter has already been given */
    if (this.incorrectLetters.indexOf(letter) >= 0
        || this.correctLetters.indexOf(letter) >= 0) {
        console.error("This letter has already been guessed.");
        return;
    }
    
    /* Try to find a match (or multiple) */
    for (let i = 0; i < this.word.length; i++) {
        if (letter == this.word[i]) {
            /* Set the state of this letter to guessed */
            this.wordProgress[i] = Guess.LetterStates.GUESSED;
            
            /* Update how many letters have been revealed (+1) */
            this.revealedLetters++;
            
            /* Work out how many letters there are left to guess */
            this.leftToGuess = this.guessableLetters - this.revealedLetters;
            
            /* Add this letter to the array of correctly-guessed letters */
            if (this.correctLetters.indexOf(letter) == -1) {
                this.correctLetters.push(letter);
            }
            
            /* We know that for this letter, there was at least one match */
            matchFound = true;
        }
    }
    
    /* Add this letter to list of incorrect letters and remove a chance. */
    if (!matchFound) {
        this.incorrectLetters.push(letter);
        this.chancesLeft--;
    }
    
    /*
        The word is complete if the amount of revealed letters is equal
        to the amount of guessable letters.
    */
    this.complete = (this.revealedLetters == this.guessableLetters);
    
    this.uiCallback.updateGuess(this);
};

/*
    A random letter from the word should be picked and then passed to the 
    'tryLetter()' method which will handle the rest.
*/
Guess.prototype.hint = function() {
    if (this.completeOrOutOfChances()) return;
    
    /* Player can't use hint if they haven't got any hints left. */
    if (this.hintsRemaining == 0) {
        console.error("No hints remaining.");
        return;
    }
    
    /* Refer to tooLateToUseHint() */
    if (this.tooLateToUseHint()) {
        console.error("It is too late to use a hint.");
    }
    
    let randomIndex, randomLetter;
    
    /* Find all letters that have not been guessed yet. */
    let unguessedLetters = [];
    for (let i = 0; i < this.wordProgress.length; i++) {
        if (this.wordProgress[i] == Guess.LetterStates.NOT_GUESSED) {
            unguessedLetters.push(this.word[i]);
        }
    }
    
    /* Choose a letter at random */
    randomIndex = Math.floor(Math.random() * unguessedLetters.length);
    randomLetter = unguessedLetters[randomIndex];
    
    this.hintsRemaining--;
    
    /* Pass this letter to tryLetter() */
    this.tryLetter(randomLetter);
};

/* Returns true if the word has been guessed or they are out of chances. */
Guess.prototype.completeOrOutOfChances = function() {
    if (this.complete) {
        console.error("The word has been already been guessed.");
        return true;
    }
    
    if (!this.chancesLeft) {
        console.error("Out of chances.");
        return true;
    }
    
    return false;
};