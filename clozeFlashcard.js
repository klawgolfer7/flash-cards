var clozeFlashcard = function (textCard, clozeCard) {
	this.partial = [];
	this.hidden = [];
	this.all = textCard.split(' ');

	for (var i = 0; i < this.all.length; i++) {
		if (clozeCard.indexOf(i) !== -1) {
			this.partial.push('_____');
			this.hidden.push(this.all[i]);
		} else {
			this.partial.push(this.all[i]);
		}
	}
	this.showPartial = function() {
		return (this.partial.join(' '));
	};
	this.showCloze = function() {
		return (this.hidden.joion(' '));
	};
	this.showAll = function() {
		return (this.all.join(' '));
	};
};

module.exports = clozeFlashcard;