// https://www.reddit.com/r/dailyprogrammer/comments/65vgkh/20170417_challenge_311_easy_jolly_jumper/

"use strict";

const isSequenceJollyJumper = (numbers) => {
    numbers = numbers.split(" ");
    let n = numbers[0];
    let numStr = numbers.join(" ");

    let diffs = [];

    for (var i=2; i<numbers.length; i++) {
        let diff = Math.abs(numbers[i] - numbers[i-1]);
        if (diff >= n)
            return numStr + " NOT JOLLY";
        diffs.push(diff);
    }

    for (var i=1; i<n; i++) {
        if (diffs.indexOf(i) == -1)
            return numStr + " NOT JOLLY";
    }
    
    return numStr + " JOLLY";
}

console.log(isSequenceJollyJumper(`4 1 4 2 3`));
console.log(isSequenceJollyJumper(`5 1 4 2 -1 6`));
console.log(isSequenceJollyJumper(`4 19 22 24 21`));
console.log(isSequenceJollyJumper(`4 19 22 24 25`));
console.log(isSequenceJollyJumper(`4 2 -1 0 2`));