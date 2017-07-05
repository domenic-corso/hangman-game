/*
    HangmanHelper contains useful methods that are commonly used by the
    other scripts.
*/

let HangmanHelper = {};

/*
    Returns true/false depending if character given is a letter.
    
    Uses regular expression /^[a-z]$/i which matches a single character
    that is between a-z.
*/
HangmanHelper.isLetter = function(char) {
    return (/^[a-z]$/i).test(char);
};

/*
    Returns true/false depending if the word given is valid.
    For a word to be valid, it may only contain spaces and letters but at
    least 1 letter.
*/
HangmanHelper.isValidWord = function(word) {
    /* Word only to contain a-z or space chars from start to finish. */
    let generalPattern = /^[a-z ]+$/i;
    
    /* Word contains only whitespace from start to finish */
    let whitespacePattern = /^\s+$/;
    
    /*
        In order for the word to be valid, it should match the general
        pattern and not match the whitespace pattern.
    */
    return (generalPattern.test(word) && !(whitespacePattern.test(word)));
};

/*
    Counts the number of letters in a word, excluding spaces to find out
    how many letters can actually be guessed by the user.
    
    For example "A Welcome Entry" would return 13 even though the length is
    15.
*/
HangmanHelper.getAmountOfGuessableLetters = function(word) {
    let guessableLetters = 0;
    
    for (let i = 0; i < word.length; i++) {
        if (HangmanHelper.isLetter(word[i])) {
            guessableLetters++;
        }
    }
    
    return guessableLetters;
};

HangmanHelper.isValidName = function(name) {
    let pattern = /^([a-z ]){2,12}$/i;
    let whitespacePattern = /^\s+$/;

    return (pattern.test(name.trim()) && !(whitespacePattern.test(name)));
};