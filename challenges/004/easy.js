// https://www.reddit.com/r/dailyprogrammer/comments/pm6oj/2122012_challenge_4_easy/

"use strict"

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
let count;
let passLength;

const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const generatePassword = (length) => {
    let pass = "";
    for (let i=0; i<length; i++) {
        pass += chooseRandomChar();
    }
    return pass;
}

const chooseRandomChar = () => {
    let index = Math.floor(Math.random() * chars.length);
    return chars[index];
}

const invalidInputMessage = () => {
    rl.write("You did not enter a valid number. Program is closed.\n")
    rl.close();
}


rl.question("How many passwords do you want to generate? ", countAnswer => {

    if (isNaN(countAnswer)) {
        invalidInputMessage();
    }
    count = parseInt(countAnswer);

    rl.question("How long should the passwords be? ", lengthAnswer => {

        if (isNaN(lengthAnswer)) {
            invalidInputMessage();
        }

        passLength = parseInt(lengthAnswer);

        for (var i=0; i<count; i++) {
            console.log(generatePassword(passLength));
        }

        rl.close();
    })
});