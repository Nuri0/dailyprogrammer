// https://www.reddit.com/r/dailyprogrammer/comments/7j33iv/20171211_challenge_344_easy_baumsweet_sequence/

"use strict";

const checkBinarySequence = (n) => {

    if (n == 0) return 1;


    let binary = n.toString(2).split("");
    let streak = 0;
    for (let i=0; i<binary.length; i++) {
        if (binary[i] == 0)
            streak++;
        else {
            if (streak % 2 != 0)
                return 0;

            streak = 0;
        }
    }

    return streak % 2 ? 0 : 1;
}

const getBaumSweetSequence = (n) => {
    let sequence = [];
    for (let i=0; i<=n; i++) {
        sequence.push(checkBinarySequence(i));
    }

    return sequence;
}

console.log(getBaumSweetSequence(20).join(", "));