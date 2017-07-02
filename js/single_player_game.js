/*
    The 'SinglePlayerGame' is a type of game mode.
*/

function SinglePlayerGame(uiCallback, category) {
    this.uiCallback = uiCallback;
    
    this.category = category;
    this.wordList = category.words;
    
    this.guessObj = null;
    this.chosenWord = null;
    this.roundFinished = false;
}

/* This will be defined by Hangman.loadCategories() */
SinglePlayerGame.categories = [];

/*
    This function will calculate how many hints are given for a word
    based on its length. The minimum amount of letters in a word before
    a hint is given is 5.
    
    This will not take spaces into account, for safety.
*/
SinglePlayerGame.calculateNumHints = function(word) {
    guessableLetters = HangmanHelper.getAmountOfGuessableLetters(word);
    return Math.floor(guessableLetters / 5);
};

/*
    1. Gets a random word from the category given in constructor.
    2. Creates a new instance of Guess.
    3. Passes the random word into the Guess object and calculates
       how many hints should be given.
*/
SinglePlayerGame.prototype.start = function() {
    this.roundFinished = false;
    
    /* Pick a random word from the list */
    let randomIndex = Math.floor(Math.random() * this.wordList.length);
    this.chosenWord = this.wordList[randomIndex];
    
    /* Prepare the Guess object */
    this.guessObj = new Guess(this.uiCallback, this);
    
    /* Calculate number of hints and pass info to Guess object */
    let hints = SinglePlayerGame.calculateNumHints(this.chosenWord);
    this.guessObj.setWord(this.chosenWord, hints);
};

SinglePlayerGame.prototype.nextRound = function() {
     
};

/*
    Callback function from the guessObj, tells us whether or not the 
    word was successfully guessed. At this point in Single Player Mode,
    this means nothing.
*/
SinglePlayerGame.prototype.guessingFinished = function(success) {
    this.roundFinished = true;
};