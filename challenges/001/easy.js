// https://www.reddit.com/r/dailyprogrammer/comments/pih8x/easy_challenge_1/

"use strict"

const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

function askName() {
	return new Promise((resolve) => {
		rl.question("How may I call you? => ", (name) => { resolve(name) });
	})
}

function askAge(name) {
	return new Promise((resolve) => {
		rl.question("How old are you? => ", (age) => { resolve([name, age]) });
	})
}

function askRedditName([name,age]) {
	return new Promise((resolve) => {
		rl.question("What is your reddit name? => ", (reddit) => { resolve([name,age,reddit]) });
	})
}

function outputEverything([name,age,reddit]) {
	var str = `Your name is ${name}, you are ${age} years old and your username is ${reddit}.`;
	console.log(str);
	fs.writeFile("output.log",str, (err) => {
		if (err) throw err;
		console.log("Results successfully written to 'output.log'");
		rl.close();
	});
}

askName().then(askAge).then(askRedditName).then(outputEverything);
