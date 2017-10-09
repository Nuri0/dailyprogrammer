// https://www.reddit.com/r/dailyprogrammer/comments/759fha/20171009_challenge_335_easy_consecutive_distance/

"use strict";

let readline = require("readline");
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
})

let input = [];

rl.on("line", line => {
    input.push(line);
});
rl.on("close", () => {
    input.shift(); // we don't need the first line
    input.forEach(line => {
        console.log(consecutiveDistanceRating(line.split(" ").map(num => parseInt(num))));
    })
})

const consecutiveDistanceRating = (sequence, gap = 1)=> {
    let numbers = {};

    sequence.forEach((num,index) => {
        numbers[num] = index;
    })

    let sum = 0;
    sequence.forEach(num => {
        if (numbers[num+gap] != undefined) {
            sum += Math.abs(numbers[num]-numbers[num+gap]);
        }
    })

    return sum;
}

