// https://www.reddit.com/r/dailyprogrammer/comments/6ba9id/20170515_challenge_315_easy_xor_multiplication/

"use strict";

const xorMultiply = (a,b) => {
    return a.toString(2).split("").reverse().map((bit,index) => {
        return (bit == "0"? 0 : b << index); // "streching" multiplication
    }).reduce((acc,value) => {
        return acc ^ value; // bitwise addition via xor
    },0);
}

const printXorMultiply = (a,b) => {
    console.log(`${a}@${b}=${xorMultiply(a,b)}`);
}

printXorMultiply(5,9);
printXorMultiply(5,9);
printXorMultiply(1,2);
printXorMultiply(9,0);
printXorMultiply(6,1);
printXorMultiply(3,3);
printXorMultiply(2,5);
printXorMultiply(7,9);
printXorMultiply(13,11);
printXorMultiply(5,17);
printXorMultiply(14,13);
printXorMultiply(19,1);
printXorMultiply(63,63);