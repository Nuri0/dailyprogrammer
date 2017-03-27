// https://www.reddit.com/r/dailyprogrammer/comments/pkwb1/2112012_challenge_3_intermediate/

"use strict"

var decrypt = function(text,key) {
	// preparing ... converting text to lowercase and generating substitution alphabet
	text = text.toLowerCase();
	var subAlph = generateSubstitutionAlphabet(key);
	
	// decrypting the message ...
	return text.split("").reduce(function(clearText,char) {
		// ... by converting every character to its "position in the alphabet"-1 (so we get indices from 0..25 for simple letters) ...
		var code = char.charCodeAt(0)-97;
		
		// ... simply copying the characters if it is no letter ...
		if (code < 0 || code > 25)
			return clearText + char;
		
		// ... or searching the position of the letter in the substitution alaphabet ...
		var newCode = subAlph.indexOf(char);
		// ... and otherwise converting this position back to normal letter.
		return clearText + String.fromCharCode(newCode+97);
	},"");
	
}

var encrypt = function(text, key) {
	// preparing = converting text to lowercase and generating substitution alphabet
	text = text.toLowerCase();
	var subAlph = generateSubstitutionAlphabet(key);
	
	// encrypting the message ...
	return text.split("").reduce(function(secret,char){
		// ... by converting every character to its "position in the alphabet"-1 (so we get indices from 0..25 for simple letters) ...
		var code = char.charCodeAt(0)-97;
		
		if (code < 0 || code > 25)
			// ... simply copying the character if it is no letter ...
			return secret + char;
		else
			// ... and otherwise swapping the letter with the corresponding symbol in the substitution alphabet
			return secret + subAlph[code];
			
	},"");
}

var generateSubstitutionAlphabet = function(key) {
	// remove duplicates in key
	var subAlph = key.split("").filter(function(element,index) {
		return (key.indexOf(element) == index);
	});
	
	var alph = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	// remove remaining characters in key from alphabet
	var pivot;
	subAlph.forEach(function(element) {
		pivot = alph.indexOf(element);
		alph.splice(pivot,1);
	});
	
	// add the remaining characters to the substitution alphabet starting at the pivot-index (first index after the last character of the key), cycling through the whole array
	alph = alph.slice(pivot).concat(alph.slice(0,pivot));
	alph.forEach(function(element) {
		subAlph.push(element);
	});
	
	return subAlph;
}

console.log(encrypt("This is just a simple test.","darudesandstorm"));
console.log(decrypt("ftoc oc mgcf d covyqe fecf.","darudesandstorm"));