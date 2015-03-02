var fs = require("fs");
var AFINN = require('./resources/AFINN.json');
var Stopwords = require('./resources/stopwords.js');

function removeStopWords(textArray) {
	var keywordArray = [];
	var stopwords = Stopwords.stopwords;

	for(var i in textArray) {
		if(stopwords.indexOf(textArray[i]) == -1)
			keywordArray.push(textArray[i]);
	}

	return keywordArray;
}

function getCleanedTextArray(text) {

	var withoutSpecialChars = text.replace(/[^a-zA-Z- ]+/g, '');
	var withoutWhiteSpace = withoutSpecialChars.replace('/ {2,}/',' ');

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
	return normalisedScore || 0;
}

module.exports = getSentiment;