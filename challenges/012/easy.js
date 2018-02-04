// https://www.reddit.com/r/dailyprogrammer/comments/pxs2x/2202012_challenge_12_easy/

"use strict";

const computeStringPermutations = (str) => {
    if (str.length == 1) {
        return [str];
    }

    let perms = [];
    str.split("").forEach((char,index) => {
        let res = computeStringPermutations(str.slice(0,index)+str.slice(index+1));
        res.forEach(substring => {
            perms.push(char + substring);
        })
    });
    return perms;
}

console.time("string permutations");
console.log(computeStringPermutations("hi!"));
console.timeEnd("string permutations");