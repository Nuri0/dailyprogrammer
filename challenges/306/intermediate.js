// https://www.reddit.com/r/dailyprogrammer/comments/5zj7e4/20170315_challenge_306_intermediate_gray_code/

"use strict";

const decimalToBinary = (number) => {
	let bin = "";
	while (number > 0) {
		bin = (number%2) + bin;
		number = Math.floor(number/2);
	}
	return bin;
}

const addLeadingZeros = (string,bits) => {
	while (string.length < bits) {
		string = "0" + string;
	}
	return string;
}

const binaryToGrayCode = (bin) => {
	let gray = "";
	let mask = "0" + bin.substr(0,bin.length-1);
	for (let i=0; i<bin.length; i++) {
		gray += mask[i]^bin[i];
	}
	return gray;
}

const getGrayCodeSequence = (bits) => {
	let array = [];
	for (let i=0; i<Math.pow(2,bits);i++) {
		array.push(addLeadingZeros(binaryToGrayCode(decimalToBinary(i)),bits));
	}
	return array;
}

const getGrayCodeSequenceByArray = (bits) => {
	let array = ["0","1"];
	while (array[0].length < bits) {
		array = array.concat(array.slice().reverse());
		array = array.map((element,index) => {
			if (index < array.length/2)
				return "0" + element;
			else
				return "1" + element;

		})
	}
	return array;
}

let bits = 8;

let array1 = getGrayCodeSequence(bits);
let array2 = getGrayCodeSequenceByArray(bits);

for (let i=0; i<array1.length; i++) {
	console.log(array1[i] + " - " + array2[i]);
}