var fs = require("fs");

fs.readFile("words.txt","utf-8", function(err,data) {
	var words = data.split("\n");
	console.log(words.length);
	
	
	words.forEach(function(word) {
		if (word.length > 4 && isRollercoasterWord(word)) {
			console.log(word);
		}
	});
});

var isRollercoasterWord = function(word) {
	var c = word[0];
	for (var i=1; i<word.length-1;i++) {
		var prev = word[i-1].charCodeAt(0);
		var cur = word[i].charCodeAt(0);
		var next = word[i+1].charCodeAt(0);
		if (!(cur < prev && cur < next) && !(cur > prev && cur > next)) {
			return false;
		}
	}
	
	return true;
}