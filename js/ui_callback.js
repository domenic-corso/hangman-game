function UICallback(ui) {
    this.ui = ui;
}

/*
    Takes a guess object as a parameter (see guess.js), grabs the important
    data and calls relevant methods on the UI to update it.
*/
UICallback.prototype.updateGuess = function(guess) {
    document.write("<hr />");
    document.write("<h2>State Update</h2>");
    document.write("<p>Word: " + guess.word + "</p>");
    document.write("<p>Hints Remaining: " + guess.hintsRemaining + "</p>");
    document.write("<p>Progress: <code>");
    
    for (let i = 0; i < guess.wordProgress.length; i++) {
        switch (guess.wordProgress[i]) {
            case Guess.LetterStates.GUESSED:
                document.write(guess.word[i] + "&nbsp;");
                break;
            case Guess.LetterStates.NOT_GUESSED:
                document.write("<span style='border-bottom: 1px solid #000;'>&nbsp;</span>&nbsp;");
                break;
            case Guess.LetterStates.SPACE:
                document.write("&nbsp;&nbsp;");
                break;
        }
    }
    
    document.write("</code></p>");
    document.write("<hr />");
    document.write("<br />");
};