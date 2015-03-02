var fs = require("fs");
var AFINN = require('./resources/AFINN.json');
var stopwords = require('./resources/stopwords.js').stopwords;

function removeStopWords(textArray) {
	var keywordArray = [];

	for(var i in textArray) {
		if(!stopwords[textArray[i]])
			keywordArray.push(textArray[i]);
	}

	return keywordArray;
}

function getCleanedTextArray(text) {

	var withoutSpecialChars = text.replace(/[^a-z ]+/g, ' ');
	var withoutWhiteSpace = withoutSpecialChars.replace(/ {2,}/g,' ');

	return withoutWhiteSpace.split(' ');
}

function getSentiment(text) {
	var lowerText = text.toLowerCase();

	var textArray = getCleanedTextArray(lowerText);

	var withoutStopWords = removeStopWords(textArray);
	var sentimentScore = 0;
	for(var i in withoutStopWords) {
		var word = withoutStopWords[i];

		if (!AFINN.hasOwnProperty(word)) continue;

		sentimentScore += Number(AFINN[word]);
	}

	var normalisedScore = sentimentScore / withoutStopWords.length;

	return {
		'absoluteScore' : sentimentScore,
		'normalisedScore' : normalisedScore || 0,
	};
}

module.exports = getSentiment;