/*
    The 'TwoPlayerGame' is a type of game mode.
*/

function TwoPlayerGame(uiCallback) {
    this.uiCallback = uiCallback;
    
    this.player1 = null;
    this.player2 = null;
    
    this.currentlyGuessing = null;
    this.guessObj = null;
    this.roundFinished = false;
}

TwoPlayerGame.prototype.setPlayer1 = function(name) {
    if (!HangmanHelper.isValidName(name)) {
        console.error("Name invalid.");
        return;
    }
    
    this.player1 = new Player(name);
};

TwoPlayerGame.prototype.setPlayer2 = function(name) {
    if (!HangmanHelper.isValidName(name)) {
        console.error("Name invalid.");
        return;
    }
    
    this.player2 = new Player(name);
};

/*
    Begin playing the two player game. A player is picked at random to guess 
    first (meaning the other player will pick a word).
*/
TwoPlayerGame.prototype.start = function() {
    /* Cannot start if either players are non-existent */
    if (this.player1 == null || this.player2 == null) {
        console.error("One or more players are not set.");
        return;
    }
    
    this.roundFinished = false;
    
    /* Pick a player to guess first. */
    this.currentlyGuessing = [this.player1, this.player2][Math.floor(Math.random() * 2)];
};

/*
    Starts a new round by creating a new Guess object. This function will
    accept a word that should have been provided by the player who is not
    guessing next.
    
    Note: the setWord() function of Guess will perform the validation.
    
    This function will return false if the given word is invalid, and true 
    if everything went well.
*/
TwoPlayerGame.prototype.nextRound = function(word, hints) {
    this.roundFinished = false;
    
    /* Create an empty Guess object */
    this.guessObj = new Guess(this.uiCallback, this);
    
    /* Try to set the word and hints. */
    if (!this.guessObj.setWord(word, hints)) {
        return false;
    }
};

/*
    Callback function from the guessObj, tells us whether or not the 
    word was successfully guessed.
    
    If the word was successfully guessed, add 1 to the points of the player
    who is currently guessing.
*/
TwoPlayerGame.prototype.guessingFinished = function(success) {
    this.roundFinished = true;
    
    if (success) {
        this.currentlyGuessing.points++;
    }
    
    /* It's the next players turn to guess. */
    this.currentlyGuessing = this.guessingNext();
};

/* Returns the Player who is going to be guessing next (useful for the GUI). */
TwoPlayerGame.prototype.guessingNext = function() {
    if (this.currentlyGuessing == this.player1) return this.player2;
    if (this.currentlyGuessing == this.player2) return this.player1;
    return null;
};