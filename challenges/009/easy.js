// https://www.reddit.com/r/dailyprogrammer/comments/pu1rf/2172012_challenge_9_easy/

"use strict";

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let strings = [];
let integers = [];

// https://stackoverflow.com/a/10834843/2505074
const isInt = (str) => {
    let n = Math.floor(Number(str));
    return String(n) === str && n >= 0;
}

const enterSomething = () => {

    resetTerminal();
    printLists();

    rl.question("You can enter an integer or string and everything will be sorted accordingly (Close program with Ctrl+C):\n",(entry) => {
        if (isInt(entry)) {
            // integer
            integers.push(parseInt(entry))
            integers = integers.sort((a,b) => a-b);
        } else {
            // string
            strings.push(entry);
            strings = strings.sort();
        }

        enterSomething();
    })
}

const printLists = () => {
    console.log("Integers");
    console.log("########");
    integers.forEach((int,index) => {
        console.log(`${index+1}. ${int}`);
    })

    console.log("");

    console.log("Strings");
    console.log("#######");
    strings.forEach((str, index) => {
        console.log(`${index+1}. ${str}`);
    })

    console.log("");
}

const resetTerminal = () => {
    console.log('\x1B[2J\x1B[0f');
}

enterSomething();