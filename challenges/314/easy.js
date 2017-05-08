// https://www.reddit.com/r/dailyprogrammer/comments/69y21t/20170508_challenge_314_easy_concatenated_integers/

"use strict";

const compareIntString = (num1,num2) => {
    let minLength = Math.min(num1.length, num2.length);

    for (let i=0; i<minLength; i++) {
        if (num1[i] != num2[i]) return num1[i]-num2[i];
    }

    if (num1.length === num2.length) return 0; // equal

    // compare the shorter number with thr remainder of the longer number to prevent "prefixing"
    if (num1.length > num2.length)
        return compareIntString(num1.slice(num2.length),num2);
    else
        return compareIntString(num1,num2.slice(num1.length));
}

const concatenateIntegers = (numbers) => {
    numbers = numbers.split(" ");
    
    return {
        numbers: numbers,
        smallest: parseInt(numbers.sort(compareIntString).join("")),
        largest: parseInt(numbers.sort(compareIntString).reverse().join(""))
    };
}

console.log(concatenateIntegers("5 56 50"));
console.log(concatenateIntegers("79 82 34 83 69"));
console.log(concatenateIntegers("420 34 19 71 341"));
console.log(concatenateIntegers("17 32 91 7 46"));