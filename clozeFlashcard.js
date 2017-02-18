// Constructor for cloze flashcards.
var ClozeFlashcard = function (textArg, clozeArg) {
    this.partial = [];
    this.hidden = [];
    this.all = textArg.split(' ');

    // Step through the full text and put a blank for each word that was hidden.
    // And add each hidden word to the cloze text.
    for (var i = 0; i < this.all.length; i++) {
        if (clozeArg.indexOf(i) !== -1) {
            this.partial.push('___');
            this.hidden.push(this.all[i]);
        } else {
            this.partial.push(this.all[i]);
        }
    }
    this.showPartial = function () {
        return (this.partial.join(' '));
    };
    this.showCloze = function () {
        return (this.hidden.join(' '));
    };
    this.showAll = function () {
        return (this.all.join(' '));
    };
};

module.exports = ClozeFlashcard;