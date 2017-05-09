// https://www.reddit.com/r/dailyprogrammer/comments/67q3s6/20170426_challenge_312_intermediate_next_largest/

"use strict";

const nextLargestNumber = (num) => {
    let digits = (num+"").split("");

    // from right search the first digit that is smaller than the previous one
    let marker = digits.length - 2;
    while(digits[marker] >= digits[marker+1]) {
        marker--;
    }

    // search the smallest digit right of the marker-digit that is greater than the marker-digit
    let smallest = Number.MAX_VALUE;
    var smallestIndex;
    for (let i=marker+1; i<digits.length; i++) {
        if (digits[i] < smallest && digits[i] > digits[marker]) {
            smallestIndex = i;
            smallest = digits[smallestIndex];
        }
    }

    // swap the found marker-digit with the last digit (as this is the smallest right from the index)
    let swap = digits[marker];
    digits[marker] = digits[smallestIndex];
    digits[smallestIndex] = swap;

    // sort everything right from the index
    digits = digits.slice(0,marker+1).concat(digits.slice(marker+1).sort());

    return digits.join("");
}

console.log(nextLargestNumber(1234));
console.log(nextLargestNumber(1243));
console.log(nextLargestNumber(234765));
console.log(nextLargestNumber(19000));