// https://www.reddit.com/r/dailyprogrammer/comments/q8aom/2272012_challenge_16_easy/

"use strict";

const removeCharsLong = (string,chars) => {
    chars.split("").forEach(char => {
        // use regular expression to globally search for the character
        string = string.replace(new RegExp(char,"g"),"");
    })
    return string;
}

const removeChars = (string,chars) => {
    return string.replace(new RegExp(`[${chars}]`,"g"),"");
}

console.log(removeCharsLong("Daily Programmer", "aeiou "));
console.log(removeCharsLong("Hello, World", ","));

console.log(removeChars("Daily Programmer", "aeiou "));
console.log(removeChars("Hello, World", ","));