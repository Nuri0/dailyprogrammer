// https://www.reddit.com/r/dailyprogrammer/comments/7so37o/20180124_challenge_348_intermediate_bowling/

"use strict";

const convertInput = (input) => {
    return input.split(" ").map(val => parseInt(val));
}

const bowlingFramesDisplay = (scores) => {
    let round = 1;
    let firstAttempt = true;
    let output = [];
    let sum = 0;

    scores.forEach(score => {

        if (firstAttempt) {
            if (score == 10) {
                output.push("X");
                if (round != 10) {
                    output.push(" ");
                    round++;
                }
            } else {
                sum = score;
                output.push(score==0?"-":score);
                firstAttempt = false;
            }
        } else {
            sum += score;
            if (sum == 10) {
                output.push("/");
            } else {
                output.push(score==0?"-":score);
            }
            firstAttempt = true;

            sum = 0;
            if (round != 10) {
                output.push(" ");
            }
            round++;
        }
    })

    return output.join("");
}

console.log(bowlingFramesDisplay(convertInput("6 4 5 3 10 10 8 1 8 0 10 6 3 7 3 5 3")));
console.log(bowlingFramesDisplay(convertInput("9 0 9 0 9 0 9 0 9 0 9 0 9 0 9 0 9 0 9 0")));
console.log(bowlingFramesDisplay(convertInput("10 10 10 10 10 10 10 10 10 10 10 10")));
console.log(bowlingFramesDisplay(convertInput("5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5")));
console.log(bowlingFramesDisplay(convertInput("10 3 7 6 1 10 10 10 2 8 9 0 7 3 10 10 10")));
console.log(bowlingFramesDisplay(convertInput("9 0 3 7 6 1 3 7 8 1 5 5 0 10 8 0 7 3 8 2 8")));