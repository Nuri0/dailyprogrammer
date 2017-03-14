// https://www.reddit.com/r/dailyprogrammer/comments/pjbj8/easy_challenge_2/

"use strict";

const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

let a,b,c;

const clearTerminal = () => {
    rl.write(null, {ctrl: true, name:"l"});
}

const getVariableA = () => {
	rl.question("Enter the value for the cathetus 'a' or leave it empty if this is the sought-after side.",input => {
		if (isNaN(input)) {
			rl.write("You didn't enter a valid number! Please try again.\n")
			getVariableA();
		} else {
			a = parseFloat(input);
			getVariableB();
		}	
	})
}

const getVariableB = () => {
	rl.question("Enter the value for the cathetus 'b' or leave it empty if this is the sought-after side.",input => {
		if (isNaN(input)) {
			rl.write("You didn't enter a valid number! Please try again.\n")
			getVariableB();
		} else {
			b = parseFloat(input);
			getVariableC();
		}	
	})
}

const getVariableC = () => {
	rl.question("Enter the value for the hypotenuse 'c' or leave it empty if this is the sought-after side.",input => {
		if (isNaN(input)) {
			rl.write("You didn't enter a valid number! Please try again.\n")
			getVariableC();
		} else {
			c = parseFloat(input);
			evaluateVariables();
		}	
	})
}

const evaluateVariables = () => {
	let missing = 0;
	if (isNaN(a)) missing++;
	if (isNaN(b)) missing++;
	if (isNaN(c)) missing++;

	if (missing > 1) {
		rl.write("There are too many unknown variables to calculate something. Please enter the numbers again with leaving at most variable empty.\n");
		getVariableA();
		return;
	}

	if (missing === 0) {
		checkForPythagoreanTriangle();
	}

	if (missing === 1) {
		calculateMissingVariable();
	}
}

const calculateMissingVariable = () => {
	if (isNaN(a)) {
		a = Math.sqrt(c*c - b*b);
		rl.write(`The missing side 'a' has a length of ${a}\n`);
	}

	if (isNaN(b)) {
		b = Math.sqrt(c*c - a*a);
		rl.write(`The missing side 'b' has a length of ${b}\n`);
	}

	if (isNaN(c)) {
		c = Math.sqrt(a*a + b*b);
		rl.write(`The missing side 'c' has a length of ${c}\n`);
	}

	rl.write(`With this the 3 sides of the right-angled triangle are:
	a = ${a}
	b = ${b}
	c = ${c}\n`);

	rl.question("Press any key to exit the program.", () => {
		rl.close();
	});
}

const checkForPythagoreanTriangle = () => {
	if (a*a + b*b == c*c) {
		rl.write(`The given triangle is right-angled!\n`)
	} else {
		rl.write(`The given side lengths do not denote a right-angled triangle, as 
		a²+b²=${a*a}+${b*b}=${a*a+b*b} is not equal to 
		c²=${c*c}.\n`)
	}

	rl.question("Press any key to exit the program.", () => {
		rl.close();
	});
}

const showMainMenu = () => {
	clearTerminal();
	rl.write(`After I couldn't come up with some formula I am using regularly, I've chosen the Pythagorean theorem, which is often used by students of mine when I'm giving private math lessons. For this we assume a right-angled triangle with the cathetus 'a' and 'b' and the hypotenuse 'c'. Shortly you will be able to enter these three triangle sides. There are two ways to use this calculator:

	1. If you enter two of the three sides, the last on will be calculated according to the Pythagorean theorem and the mentioned nature of 'a', 'b' and 'c'.
	2. If you enter all of the three sides, the calculator will check, if they really correspond to a right-angled triangle.\n`);
	rl.question("If you are ready, press any key.", () => {
		getVariableA();
	});
}

showMainMenu();