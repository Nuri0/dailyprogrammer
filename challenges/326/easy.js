// https://www.reddit.com/r/dailyprogrammer/comments/6s70oh/2017087_challenge_326_easy_nearest_prime_numbers/

"use strict";

const isPrime = (number) => {
    if (number < 1) return false;
    if (number == 1) return false;
    if (number < 4) return true;            // 2 and 3 are prime
    if (number % 2 === 0) return false;     // even numbers are no primes
    if (number < 9) return true;            // 7 as 4,6,8 have already been excluded
    if (number % 3 === 0) return false;

    let r = Math.floor(Math.sqrt(number));
    let f = 5;
    while (f <= r) {
        if (number % f === 0) return false;

        if (number % (f+2) === 0) return false;

        f += 6;
    }
    return true;
}

const getNearestPrimes = (number) => {
    if (isPrime(number)) {
        return `${number} is prime.`;
    }

    let prevPrime = number;
    let nextPrime = number;

    // if we start at an even number, switch the to the next uneven one
    if (number % 2 == 0) {
        prevPrime -= 1;
        nextPrime += 1;
    }

    while (!isPrime(prevPrime)) prevPrime -= 2;
    while (!isPrime(nextPrime)) nextPrime += 2;

    return `${prevPrime} < ${number} < ${nextPrime}`;
}

console.log(getNearestPrimes(270));
console.log(getNearestPrimes(541));
console.log(getNearestPrimes(993));
console.log(getNearestPrimes(649));

console.log(getNearestPrimes(2010741));