// https://www.reddit.com/r/dailyprogrammer/comments/qnkro/382012_challenge_20_easy/

"use strict";

function sieveOfErastothenes(n) {
    let marked = new Array(n).fill(false);
    let primes = [];

    for (let i=2; i<n; i++) {
        if (marked[i]) {
            // skip this number as it has already been visited
            continue;
        }

        primes.push(i);
        let sum = i;
        while (sum < n) {
            marked[sum] = true;
            sum += i;
        }
    }
    return primes;
}

console.time("primes");
console.log(sieveOfErastothenes(2000));
console.timeEnd("primes");