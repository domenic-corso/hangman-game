function UICallback(ui) {
    this.ui = ui;
}

/*
    Takes a guess object as a parameter (see guess.js), grabs the important
    data and calls relevant methods on the UI to update it.
*/
UICallback.prototype.updateGuess = function(guess) {
//    document.write("<hr />");
//    document.write("<h2>Guess Update</h2>");
//    document.write("<p>Word: " + guess.word + "</p>");
//    document.write("<p>Guessable Letters: " + guess.guessableLetters + "</p>");
//    document.write("<p>Hints Remaining: " + guess.hintsRemaining + "</p>");
//    document.write("<p>Progress: <code>");
//    
//    for (let i = 0; i < guess.wordProgress.length; i++) {
//        switch (guess.wordProgress[i]) {
//            case Guess.LetterStates.GUESSED:
//                document.write(guess.word[i] + "&nbsp;");
//                break;
//            case Guess.LetterStates.NOT_GUESSED:
//                document.write("<span style='border-bottom: 1px solid #000;'>&nbsp;</span>&nbsp;");
//                break;
//            case Guess.LetterStates.SPACE:
//                document.write("&nbsp;&nbsp;");
//                break;
//        }
//    }
//    
//    document.write("</code></p>");
//    document.write("<p>Left to guess: " + guess.leftToGuess + "</p>");
//    document.write("<p>Incorrect Letters: ");
//    for (let i = 0; i < guess.incorrectLetters.length; i++) {
//        document.write(guess.incorrectLetters[i] + ", ");
//    }
//    document.write("</p>");
//    document.write("<p>Correct Letters: ");
//    for (let i = 0; i < guess.correctLetters.length; i++) {
//        document.write(guess.correctLetters[i] + ", ");
//    }
//    document.write("</p>");
//    document.write("<p>Chances Left: " + guess.chancesLeft + "</p>");
//    document.write("<p>Completed: " + guess.complete + "</p>");
//    document.write("<hr />");
//    document.write("<br />");
};

UICallback.prototype.updateTwoPlayer = function(twoPlayerGame) {
    document.write("<hr />");
    document.write("<h2>Two Player Update</h2>");
    document.write("<p>Player 1: " + twoPlayerGame.player1.name + "</p>");
    document.write("<p>Points: " + twoPlayerGame.player1.points + "</p>");
    document.write("<p>Player 2: " + twoPlayerGame.player2.name + "</p>");
    document.write("<p>Points: " + twoPlayerGame.player2.points + "</p>");
    document.write("<p>Currently Guessing: " + twoPlayerGame.currentlyGuessing.name + "</p>");
    document.write("<p>Guessing Next: " + twoPlayerGame.guessingNext().name + "</p>");
    document.write("<hr />");
};