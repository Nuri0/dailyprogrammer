// https://www.reddit.com/r/dailyprogrammer/comments/7yyt8e/20180220_challenge_352_easy_making_imgurstyle/

"use strict";

const BigNumber = require("bignumber.js");

const alph = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function decToBase62(number) {
    let num = BigNumber(number);
    let digits = [];
    while (!num.isZero()) {
        digits.push(parseInt(num.mod(62).toString()));
        num = num.dividedToIntegerBy(62);
    }

    return digits.map(val => alph[val]).reverse().join("");
}

console.time("toBase62");
console.log(decToBase62("15674"));
console.log(decToBase62("7026425611433322325"));
console.log(decToBase62("187621"));
console.log(decToBase62("237860461"));
console.log(decToBase62("2187521"));
console.log(decToBase62("18752"));
console.timeEnd("toBase62");