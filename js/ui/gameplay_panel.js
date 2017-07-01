let GameplayPanel = {
    hangmanGame: null,
    e: {
        panel: document.getElementById("mp-gameplay"),
        wordProgress: document.getElementById("mpc-gameplay-word-progress"),
        incorrectLettersList: document.getElementById("incorrect-letters-list"),
        twoPlayerStats: document.getElementById("mpc-gameplay-tpstats-cont"),
        keys: document.querySelectorAll(".mpc-keyboard-key")
    },
    evtCallbacks: {
        keyPressed: function(e) {
            let letter = e.target.innerHTML.trim();
            this.hangmanGame.activeGameMode.guessObj.tryLetter(letter);
        }
    }
};

GameplayPanel.init = function(hangmanGame) {
    this.hangmanGame = hangmanGame;
    this.addEventListeners();
};

GameplayPanel.onShow = function() {
    
};

GameplayPanel.addEventListeners = function() {
    /* For each key on the keyboard. */
    for (let i = 0; i < this.e.keys.length; i++) {
        this.e.keys[i].addEventListener("click", this.evtCallbacks.keyPressed.bind(this));
    }
};

/*
    'states' is an array of equal length to the word that contains the letter
    states for each word. See Guess.LetterStates.
*/
GameplayPanel.updateWordProgress = function(word, states) {
    /* Clear the current word progress. */
    JSAK.removeAllChildren(this.e.wordProgress);
    
    /*
        This function will return a <div> element with a letter progress
        class based on the state.
    */
    let getLetterProgressDIV = function(letter, state) {
        let elem = document.createElement("div");
        
        /* Use the appropriate class based on state of letter. */
        let className;
        switch (state) {
            case Guess.LetterStates.GUESSED:
                className = "letter-progress-guessed";
                break;
            case Guess.LetterStates.NOT_GUESSED:
                className = "letter-progress-not-guessed";
                break;
            case Guess.LetterStates.SPACE:
                className = "letter-progress-space";
                break;
        }
        
        elem.className = className;
        
        /* Add the letter to the HTML if it as been guessed. */
        if (state == Guess.LetterStates.GUESSED) {
            elem.innerHTML = letter.toUpperCase();
        }
        else {
            elem.innerHTML = "&nbsp;";
        }
        
        return elem;
    };
    
    let toAppend;
    for (let i = 0; i < states.length; i++) {
        toAppend = getLetterProgressDIV(word[i], states[i]);
        this.e.wordProgress.appendChild(toAppend);
    }
};

GameplayPanel.updateIncorrectLetters = function(incorrectLetters) {
    JSAK.removeAllChildren(this.e.incorrectLettersList);
    
    let getIncorrectLetterDIV = function(letter) {
        let elem = document.createElement("div");
        
        elem.innerHTML = letter.toUpperCase();
        elem.className = "mpc-incorrect-letter";
        
        return elem;
    };
    
    let toAppend;
    for (let i = 0; i < incorrectLetters.length; i++) {
        toAppend = getIncorrectLetterDIV(incorrectLetters[i]);
        this.e.incorrectLettersList.appendChild(toAppend);
    }
};

GameplayPanel.singlePlayerMode = function(b) {
    if (b) {
        this.e.twoPlayerStats.style.display = "none";
    }
    else {
        this.e.twoPlayerStats.style.display = "flex";
    }
};