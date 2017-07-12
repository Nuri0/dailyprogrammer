// https://www.reddit.com/r/dailyprogrammer/comments/6melen/20170710_challenge_323_easy_3sum/

"use strict";

const threeSum = (str) => {
    let numbers = str.split(" ").map(el => parseInt(el));
    let result = threeSumIt(numbers);

    // remove duplicates
    result = result.map(arr => arr.sort().join(" ")).filter((element,position,array) => position == array.indexOf(element)).map(arr => arr.split(" "));

    return result;
}

const threeSumIt = (numbers) => {
    let result = [];
    for (let i=0; i<numbers.length-2; i++) {
        for (let j=i+1; j<numbers.length-1; j++) {
            for (let k=j+1; k<numbers.length; k++) {
                if (numbers[i]+numbers[j]+numbers[k] === 0) {
                    result.push([numbers[i],numbers[j],numbers[k]]);
                }
            }
        }
    }
    return result;
}

const output3SumResult = (results) => {
    console.log();
    results.forEach(result => {
        console.log(result.join(" "));
    })
}


output3SumResult(threeSum("9 -6 -5 9 8 3 -4 8 1 7 -4 9 -9 1 9 -9 9 4 -6 -8"));
output3SumResult(threeSum("4 5 -1 -2 -7 2 -5 -3 -7 -3 1"));
output3SumResult(threeSum("-1 -6 -3 -7 5 -8 2 -8 1"));
output3SumResult(threeSum("-5 -1 -4 2 9 -9 -6 -1 -7"));