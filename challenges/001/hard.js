"use strict"

// https://www.reddit.com/r/dailyprogrammer/comments/pii6j/difficult_challenge_1/

/** 
 * I purposely didn't implement the optimal solution where the search domain is cut in half by selecting exactly the middle between the currently lowest and highest possible value.
 * Instead I wanted to make it a little bit more 'realistic' and human by selecting a random value in the possible range.
 */


const readline = require("readline");

function randomIntegerBetween (min,max) {
	return Math.floor(Math.random()*(max-min+1))+min;
}

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var curMin = 1, curMax = 100;
var guess = randomIntegerBetween(curMin,curMax);
var guessCount = 1;

console.log(`Lets play a little game. You may think of a number between 1-100 (inclusively) and I'll try to guess the number you have choosen. Ready? Ok, then lets go! My first guess will be ... ${guess}. Is your number higher (h), lower (l) or am I even correct (c)?`);
rl.prompt();

rl.on("line", (line) => {
	switch(line.trim()) {
		case "h":
			curMin = guess+1;
			guessCount++;
			guess = randomIntegerBetween(curMin,curMax);
			console.log(`Ok, I'll try again. How about ... ${guess}? Is your number higher (h) or lower (l) as my guess or even correct (c)?`);
			rl.prompt();
			break;
		case "l":
			curMax = guess-1;
			guessCount++;
			guess = randomIntegerBetween(curMin,curMax);
			console.log(`Ok, I'll try again. How about ... ${guess}? Is your number higher (h) or lower (l) as my guess or even correct (c)?`);
			rl.prompt();
			break;
		case "c":
			console.log(`Yeah. I've managed to guess the correct number (${guess}) in ${guessCount} tries!`);
			rl.close();
	}
});

