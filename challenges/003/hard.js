// https://www.reddit.com/r/dailyprogrammer/comments/pkwgf/2112012_challenge_3_difficult/

"use strict"

var fs = require("fs");
var path = require("path");

fs.readFile(path.join(__dirname,"wordlist.txt"),"utf-8",function(err,data) {
	if (err) throw err;
	
	var words = data.split("\r\n");
	var sortedWords = words.map(function(word) {
		return word.split("").sort().join("")
	});
	
	var scrambled = ["mkeart","sleewa","edcudls","iragoge","usrlsle","nalraoci","nsdeuto","amrhat","inknsy","iferkna"];
	
	scrambled.forEach(function(scrambledWord) {
		var sorted = scrambledWord.split("").sort().join("");
		var index = sortedWords.indexOf(sorted);
		console.log(scrambledWord + " => " + words[index]);
	});
});