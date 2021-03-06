let GameplayPanel = {
    hangmanGame: null,
    parentUI: null,
    imagesRootDir: "ui_images/",
    chancesLeftFilePrefix: "pv_chances_left_",
    chancesLeftFileExt: ".png",
    e: {
        panel: document.getElementById("mp-gameplay"),
        wordProgress: document.getElementById("mpc-gameplay-word-progress"),
        progressImage: document.getElementById("progress-image"),
        incorrectLettersList: document.getElementById("incorrect-letters-list"),
        twoPlayerStats: document.getElementById("mpc-gameplay-tpstats-cont"),
        player1Name: document.getElementById("player1-name"),
        player2Name: document.getElementById("player2-name"),
        player1Points: document.getElementById("player1-points"),
        player2Points: document.getElementById("player2-points"),
        nextRoundButton: document.getElementById("next-round-btn"),
        keys: document.querySelectorAll(".mpc-keyboard-key"),
        hintButton: document.getElementById("hint-btn"),
        hintsRemainingText: document.getElementById("num-hints-remaining")
    },
    evtCallbacks: {
        keyPressed: function(e) {
            let letter = e.target.innerHTML.trim();
            this.hangmanGame.activeGameMode.guessObj.tryLetter(letter);
        },
        hintPressed: function(e) {
            this.hangmanGame.activeGameMode.guessObj.hint();
        },
        nextRoundPressed: function(e) {
            /*
                If a single player game is being played, start the next round
                as it does not require any paramaters. A two player game
                however should switch to the word insertion panel which will
                then do the job of calling nextRound()
            */
            if (this.hangmanGame.activeGameMode instanceof SinglePlayerGame) {
                this.hangmanGame.activeGameMode.nextRound();
            }
            else {
                this.parentUI.showPanel(this.parentUI.panels.enterWord);
            }
        }
    }
};

GameplayPanel.init = function(hangmanGame, parentUI) {
    this.hangmanGame = hangmanGame;
    this.parentUI = parentUI;
    this.addEventListeners();
};

GameplayPanel.onShow = function() {

};

GameplayPanel.addEventListeners = function() {
    /* For each key on the keyboard. */
    for (let i = 0; i < this.e.keys.length; i++) {
        this.e.keys[i].addEventListener("click", this.evtCallbacks.keyPressed.bind(this));
    }

    /* For the hint button. */
    this.e.hintButton.addEventListener("click", this.evtCallbacks.hintPressed.bind(this));

    /* For the next round button. */
    this.e.nextRoundButton.addEventListener("click", this.evtCallbacks.nextRoundPressed.bind(this));
};

GameplayPanel.getLetterProgressDIV = function(letter, state) {
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

/*
    'states' is an array of equal length to the word that contains the letter
    states for each word. See Guess.LetterStates.
*/
GameplayPanel.updateWordProgress = function(word, states) {
    /* Clear the current word progress. */
    JSAK.removeAllChildren(this.e.wordProgress);

    let toAppend;
    for (let i = 0; i < states.length; i++) {
        toAppend = this.getLetterProgressDIV(word[i], states[i]);
        this.e.wordProgress.appendChild(toAppend);
    }
};

GameplayPanel.updateProgressVisual = function(chancesLeft) {
    let prefix = this.chancesLeftFilePrefix;
    let ext = this.chancesLeftFileExt;
    let rootDir = this.imagesRootDir;

    let imgSrc = rootDir + prefix + chancesLeft + ext;

    this.e.progressImage.setAttribute("src", imgSrc);
};

GameplayPanel.revealFullWord = function(word) {
    JSAK.removeAllChildren(this.e.wordProgress);

    for (let i = 0; i < word.length; i++) {
        toAppend = this.getLetterProgressDIV(word[i], Guess.LetterStates.GUESSED);
        this.e.wordProgress.appendChild(toAppend);
    }
};

/*
    Adds the letters that were incorrectly guessed on the side of the
    panel.
*/
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

GameplayPanel.disableAllGuessedLetters = function(guessedLetters) {
    /* Enable all of them first to ensure it's accurate with the Guess. */
    for (let i = 0; i < this.e.keys.length; i++) {
        this.e.keys[i].disabled = false;
    }

    for (let i = 0; i < guessedLetters.length; i++) {
        this.disableKey(guessedLetters[i]);
    }
};

GameplayPanel.getKeyByLetter = function(letter) {
    letter = letter.toUpperCase();

    let keyElem, html, htmlLetter;
    for (let i = 0; i < this.e.keys.length; i++) {
        keyElem = this.e.keys[i];
        html = keyElem.innerHTML;
        htmlLetter = html.toUpperCase();

        if (htmlLetter == letter) return keyElem;
    }
};

GameplayPanel.disableKey = function(letter) {
    let keyElem = this.getKeyByLetter(letter);

    if (keyElem instanceof Node) {
        keyElem.disabled = true;
    }
};

/*
    Shows/Hides the two-player scoreboard depending on the mode.
*/
GameplayPanel.singlePlayerMode = function(b) {
    if (b) {
        this.e.twoPlayerStats.style.display = "none";
    }
    else {
        this.e.twoPlayerStats.style.display = "flex";
    }
};

GameplayPanel.hintButtonEnabled = function(b) {
    this.e.hintButton.disabled = !b;
}

/*
    Updates the amount of hints remaining and deactivates the button if the
    player has none left.
*/
GameplayPanel.updateHints = function(hintsRemaining) {
    this.e.hintsRemainingText.innerHTML = hintsRemaining;

    /* Disable button if no hints remaining. */
    if (!this.e.hintButton.disabled) {
        if (hintsRemaining == 0) {
            this.e.hintButton.disabled = true;
        } else {
            this.e.hintButton.disabled = false;
        }
    }
};

/*
    Changes the colour/appearence of the letter progress based on the overall
    state of the guess. Generally, green == success, red == failure and white
    == in progress. See Guess.OverallStates;
*/
GameplayPanel.setOverallState = function(overallState) {
    let className = "in_progress";
    switch (overallState) {
        case Guess.OverallState.IN_PROGRESS:
            className = "in_progress";
            break;
        case Guess.OverallState.FAIL:
            className = "fail";
            break;
        case Guess.OverallState.COMPLETE:
            className = "complete";
            break;
    }

    this.e.wordProgress.className = className;
};

GameplayPanel.nextRoundButtonEnabled = function(b) {
    if (b) {
        this.e.nextRoundButton.disabled = false;
        this.e.nextRoundButton.style.display = "inline-block";
    } else {
        this.e.nextRoundButton.disabled = true;
        this.e.nextRoundButton.style.display = "none";

    }
};

GameplayPanel.setPlayer1Name = function(name) {
    this.e.player1Name.innerHTML = name;
};

GameplayPanel.setPlayer2Name = function(name) {
    this.e.player2Name.innerHTML = name;
};

GameplayPanel.setPlayer1Points = function(points) {
    this.e.player1Points.innerHTML = points;
};

GameplayPanel.setPlayer2Points = function(points) {
    this.e.player2Points.innerHTML = points;
};
