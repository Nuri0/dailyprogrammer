// https://www.reddit.com/r/dailyprogrammer/comments/5llkbj/2017012_challenge_298_easy_too_many_parentheses/

var minimizeParentheses = function(expression) {
	var tempPairs = [];
	var pairs = [];
	
	// travel through expression to find pairs of parentheses
	for (var i=0; i<expression.length; i++) {
		if (expression.charAt(i) == '(') {
			tempPairs.push({"left":i});
		}
		if (expression.charAt(i) == ')') {
			var temp = tempPairs.pop();
			temp["right"]=i;
			pairs.push(temp);
		}
	}
	
	// now analyze parentheses to potentially delete some of them
	var toDelete = [];
	for (var i=0; i<pairs.length; i++) {
		var left = pairs[i].left, right = pairs[i].right;
		if (expression.charAt(left-1) == '(' && expression.charAt(right+1) == ')') {
			// parenthesis surrounded by another one => this one can safely be deleted
			toDelete.push(pairs[i].left);
			toDelete.push(pairs[i].right);
		}
		
		if (left === right-1) {
			// BONUS: empty parentheses
			toDelete.push(pairs[i].left);
			toDelete.push(pairs[i].right);
			
		}
	}
	
	toDelete.sort(function(a,b){return a-b});
	// now delete obsolete parenthesis
	for (var i=toDelete.length-1; i>=0; i--) {
		expression = expression.slice(0,toDelete[i]) + expression.slice(toDelete[i]+1);
	}
	
	if (expression.length == 0) {
		expression = "NULL";
	}
	
	return expression;
}

var inputs = [
	"((a((bc)(de)))f)",
	"(((zbcd)(((e)fg))))",
	"ab((c))",
	"()",
	"((fgh()()()))",
	"()(abc())"
];


for (var i=0; i<inputs.length; i++) {
	console.log(minimizeParentheses(inputs[i]));
}
