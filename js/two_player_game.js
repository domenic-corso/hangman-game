/*
    The 'TwoPlayerGame' is a type of game mode.
*/

function TwoPlayerGame(uiCallback) {
    this.uiCallback = uiCallback;
    
    this.player1 = null;
    this.player2 = null;
    this.currentlyGuessing = null;
    this.guessObj = null;
}

TwoPlayerGame.prototype.setPlayer1 = function(name) {
    this.player1 = new Player(name);
};

TwoPlayerGame.prototype.setPlayer2 = function(name) {
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
    
    /* Pick a player to guess first. */
    this.currentlyGuessing = [this.player1, this.player2][Math.floor(Math.random() * 2)];
    
};

TwoPlayerGame.prototype.nextRound = function(word) {
    
};

/* Returns the Player who is going to be guessing next (useful for the GUI). */
TwoPlayerGame.prototype.guessingNext = function() {
    if (this.currentlyGuessing == this.player1) return this.player2;
    if (this.currentlyGuessing == this.player2) return this.player1;
    return null;
};