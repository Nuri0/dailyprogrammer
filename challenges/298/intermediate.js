// https://www.reddit.com/r/dailyprogrammer/comments/5m034l/20170104_challenge_298_intermediate_too_many_or/

var getInbalancePos = function(expression) {
	var tempPairs = [];
	
	for (var i=0; i<expression.length; i++) {
		if (expression.charAt(i) == '(') {
			tempPairs.push(i);
		}
		if (expression.charAt(i) == ')') {
			if (tempPairs.pop() == undefined) {
				// ')' but no fitting '(' came before => unbalanced!!!
				//console.log("( - " + i);
				return i;
			}
		}
	}
	
	if (tempPairs.length != 0) {
		// there is at least one '(' that hasn't been closed => unbalanced!!!
		return tempPairs.pop();
	} else {
		// all parentheses have been balanced
		return expression.length;
	}
}

var inputs = [
	")(asdf)))",
	"((((asdf)))",
	"((((asdf))",
	"(ab)((cd)(asdf)))",
	"(ab)((cd)(asdf)())",
	"(ab)(((cd)(asdf)",
	"(ab)(((cd)(asdf",
	"(ab)(((cd)(asdf)))))"
];

for (var i=0; i<inputs.length; i++) {
	var pos = getInbalancePos(inputs[i]);
	if (pos == inputs[i].length) {
		console.log(inputs[i]);
	} else {
		console.log(inputs[i].slice(0,pos) + "**" + inputs[i].charAt(pos) + "**" + inputs[i].slice(pos+1));
	}
}
