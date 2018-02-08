// https://www.reddit.com/r/dailyprogrammer/comments/7vx85p/20180207_challenge_350_intermediate_balancing_my/

"use strict";

function parseInput(input) {
    return input.split(" ").map(val => parseInt(val));
}

function getBalancePositions(spendings) {
    let balance = [];

    let sum = 0;
    for (let i=0; i<spendings.length; i++) {
        balance.push({fromLeft:sum});
        sum += spendings[i];
    }

    sum = 0;
    for (let i=spendings.length-1; i>=0; i--) {
        balance[i].fromRight = sum;
        sum += spendings[i];
    }

    let indices = [];
    for (let i=0; i<spendings.length; i++) {
        if (Math.abs(balance[i].fromLeft) == Math.abs(balance[i].fromRight)) {
            indices.push(i);
        }
    }

    return indices;
}

console.log(getBalancePositions(parseInput("0 -3 5 -4 -2 3 1 0")));
console.log(getBalancePositions(parseInput("3 -2 2 0 3 4 -6 3 5 -4 8")));
console.log(getBalancePositions(parseInput("9 0 -5 -4 1 4 -4 -9 0 -7 -1")));
console.log(getBalancePositions(parseInput("9 -7 6 -8 3 -9 -5 3 -6 -8 5")));