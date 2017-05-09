// https://www.reddit.com/r/dailyprogrammer/comments/pm6sq/2122012_challenge_4_intermediate/

"use strict"

const calculate = (str) => {

    

}

const calculateLazyAndUnsafe = (str) => {
    try {
        return eval(str);
    } catch(err) {
        return `eval()-Error: ${err.message}`;
    }
    
}

console.log(calculate("5*5+4"));
console.log(calculateLazyAndUnsafe("5*5+4"));

console.log(calculate("6(4+3)"));
console.log(calculateLazyAndUnsafe("6*(4+3)"));

console.log(calculate("3 ** 3"));
console.log(calculateLazyAndUnsafe("3 ** 3"));