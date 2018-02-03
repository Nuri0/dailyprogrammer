// https://www.reddit.com/r/dailyprogrammer/comments/q4c34/2242012_challenge_15_easy/

"use strict";

let readline = require("readline");
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let lines = [];
let longestLine = -1;

if (process.argv.length <= 2 || !(process.argv[2] == "l" || process.argv[2] == "r")) {
    console.log("Please pipe a text file as input and pass [l|r] as parameter to left- or right-justify the given text.")
    process.exit();
}

rl.on("line", (line) => {
    if (process.argv[2] == "l") {
        console.log(line.replace(/^\s+/g,""));
    }
    if (process.argv[2] == "r") {
        lines.push(line);
        longestLine = Math.max(longestLine,line.length);
    }
});

rl.on("close", () => {
    if (process.argv[2] ==  "r") {
        lines.forEach(line => {
            while (line.length < longestLine) {
                line = " " + line;
            }
            // console.log(line.length);
            console.log(line);
        });
    }
});