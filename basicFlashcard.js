var basicFlashcard = function (frontCard, backCard) {
	this.front = frontCard;
	this.back = backCard;
	this.showFront = function() {
		return(this.front);
	};
	this.showBack = function() {
		return(this.back);
	};
}

module.exports = basicFlashcard;

hopefully this works