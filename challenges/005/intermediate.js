// https://www.reddit.com/r/dailyprogrammer/comments/pnhtj/2132012_challenge_5_intermediate/

"use strict";

var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
})

if (process.argv.length <= 1) {
    console.error("You need to pass a text file to search for anagrams.")
    process.exit();
}

let fileLines = [];

rl.on("line", function(line) {
    fileLines.push(line);
})
rl.on("close", function() {
    searchTextForAnagrams(fileLines.join(" "));
});

const searchTextForAnagrams = (text) => {
    // get everything to lowercase ..
    // ... separate by some special characters ...
    // ... and remove empty words
    let words = text.toLowerCase().split(/[., "()!?]/).filter(word => word != "");

    let anagrams = [];
    let wordData = {};
    words.forEach(word => {
        let sorted = word.split("").sort().join("");
        if (!wordData[sorted]) {
            wordData[sorted] = [];
            wordData[sorted].push(word);
        } else {
            if (wordData[sorted].indexOf(word) == -1) {
                anagrams.push(sorted);
                wordData[sorted].push(word);
            }
        }
    })

    anagrams.forEach(anagram => {
        console.log(`${anagram} => ${wordData[anagram]}`);
    });
}