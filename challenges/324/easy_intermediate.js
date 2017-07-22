// https://www.reddit.com/r/dailyprogrammer/comments/6nstip/20170717_challenge_324_easy_manual_square_root/

"use strict";

const charToDigit = char => {
    return parseInt(char);
}

// convert the given number into arrays of digits separated into those before and after the decimal point
const convertNumberToDigits = (number) => {
    
    // after decimal point
    let digitsAd = [];
    // before decimal point
    let digitsBd = [];

    if (number % 1 != 0) 
        digitsAd = (""+number).split(".")[1].split("");

    // for bigger number that are displayed like 1.9999e28 we have to get the whole part manually
    number = Math.floor(number);
    while (number >= 1) {
        digitsBd.push(number % 10);
        number /= 10;
        number = Math.floor(number);
    }
    digitsBd = digitsBd.reverse();
    digitsAd = digitsAd.map(charToDigit);

    return {digitsBd, digitsAd};
}

const manualSquareRoot = (precision, number) => {
    let {digitsBd, digitsAd} = convertNumberToDigits(number);

    // even number of digits before decimal point
    if (digitsBd.length % 2 != 0) digitsBd.unshift(0);
    if (digitsAd.length % 2 != 0) digitsAd.push(0);
    let digits = digitsBd.concat(digitsAd);

    let result = [];
    let i=1;
    let a = 0;

    // get first digit of result
    let remaining = digits.shift()*10 + digits.shift();
    while (i*i <= remaining) i++;
    i--;
    a = a*10+i;
    result.push(i);
    remaining -= i*i;

    for (let j=0; j<(digitsBd.length/2)-1+precision; j++) {
        if (digits.length != 0) {
            remaining = remaining*100 + digits.shift()*10 + digits.shift();
        } else {
            remaining *= 100;
        }

        i=0;
        let temp = 20*a;
        while ((temp + i) * i <= remaining) i++;
        i--;
        a = a*10+i;
        result.push(i);
        remaining -= (temp + i) * i;
    }

    if (precision > 0)
        result.splice(digitsBd.length/2,0,".");


    return result.join("");
}


console.log(manualSquareRoot(0,7720.17));
console.log(manualSquareRoot(1,7720.17));
console.log(manualSquareRoot(2,7720.17));
console.log(manualSquareRoot(0,12345));
console.log(manualSquareRoot(8,123456));
console.log(manualSquareRoot(1,12345678901234567890123456789));
