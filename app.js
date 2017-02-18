// require NPM package and flashcards module.
var inquirer = require('inquirer');
var fs = require('fs');
var Flashcards = require('./flashcards.js');

// file with flashcard questions.
var cardFile = 'cards.txt';

// question to ask on script run. 
var runQuestion = {
	name: 'runType',
	message: 'Would you like to view flashcards or create new flashcards?',
	type: 'list',
	choices: ['View', 'Create']
};

// question to ask when creating new cards
var createCardQuestions = [
	{
		name: 'type',
		type: 'list',
		message: 'What kind of flashcard would you like to make?',
		choices: ['basic', 'cloze']
	},
	{
		name: 'front',
		type: 'input',
		message: 'What should be on the front of the card?',
		when: function (answers) {
			return (answers.type === 'basic');
		}
	},
	{
		name: 'back',
		type: 'input',
		message: 'What should be on the back of the card?',
		when: function (answers) {
			return (answers.type === 'basic');
		}
	},
	{
		name: 'text',
		type: 'input',
		message: 'What should be the full text of the card?',
		when: function (answers) {
			return (answers.type === 'cloze');
		}
	}

]; 

var runPrompt = function () {
	inquirer.prompt(runQuestion).then(function (answers) {
		if (answers.runType === 'View') {
		createCards();
		}	else {
		createCardPrompt();
		}
	});
};

// on Script run, run the initial prompt

runPrompt();

// inquirer prompt to determine which words on a cloze flashcard should be hidden

var getClozeText = function (ans) {
	inquirer.prompt ({
		name: 'cloze',
        type: 'checkbox',
        message: 'Which words should be hidden when the cloze portion is not shown?',
        choices: function() {
            choiceArray = [];
            for (var i = 0; i < ans.text.split(' ').length; i++) {
                choiceArray.push({
                    name: ans.text.split(' ')[i],
                    value: i
                })
            }
            return choiceArray;
        },
        validate: function(input) {
            if (input.length !== 0 && input.length !== ans.text.split(' ').length) {
                return true;
            } else {
                return 'You must select at least one but not all words to be hidden.';
            }
        }
    }).then(function (answers) {
        var clozeAnswers = {
            type: 'cloze',
            text: ans.text,
            cloze: answers.cloze
        };
        logCard(clozeAnswers);
    })
};


var createCardPrompt = function () {
	inquirer.prompt(createCardQuestions).then(function (answers) {
		if (answers.type === 'basic') {
			logCard(answers);
		} else {
			getClozeText(answers);
		}
	});
};

// Save the new cards to cards.txt
var logCard = function (answers) {
	var appendText;
	if (answers.type === 'basic') {
		appendText = {
			type: answers.type,
			front: answers.front,
			back: answers.back
		};
	} else {
		appendText = {
			type: answers.type,
			text: answers.text,
			cloze: answers.cloze
		};
	}
	fs.appendFile(cardFile, JSON.stringify(appendText) + '\r\n');
};

// Read cards from log.txt and create a new card of that type with the correct constructor.
// Then, for demonstration purposes: Run the methods to show the card content.
var createCards = function () {
    // Read cards.
    fs.readFile(cardFile, 'utf8', function (error, data) {
        // Split on line breaks.
        var cards = data.split('\r\n');
        // For each card,
        cards.forEach(function (card) {
            // If it's not a blank line,
            if (card.length > 0) {
                // Parse the JSON.
                card = JSON.parse(card);
                // Create a basic card if the type is basic.
                if (card.type === 'basic') {
                    var newBasicCard = new Flashcards.BasicFlashcard(card.front, card.back);
                    // Log the results of the convenience methods.
                    console.log(newBasicCard.showFront());
                    console.log(newBasicCard.showBack());
                // Create a cloze card if the type is cloze.
                } else {
                    var newClozeCard = new Flashcards.ClozeFlashcard(card.text, card.cloze);
                    // Log the results of the convenience methods.
                    console.log(newClozeCard.showAll());
                    console.log(newClozeCard.showPartial());
                    console.log(newClozeCard.showCloze());
                }
            }
        });
    });
};


