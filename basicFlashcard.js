// Constructor for basic flashcards.
var BasicFlashcard = function(frontArg, backArg) {
    this.front = frontArg;
    this.back = backArg;
    this.showFront = function() {
        return(this.front);
    };
    this.showBack = function() {
        return(this.back);
    };
};

module.exports = BasicFlashcard;