/*
    The 'SinglePlayerGame' is a type of game mode.
*/

function SinglePlayerGame(difficulty) {
    this.difficulty = difficulty;
}

SinglePlayerGame.Difficulties = {
    EASY: "easy",
    MEDIUM: "medium",
    HARD: "hard"
};