// https://www.reddit.com/r/dailyprogrammer/comments/6ldv3m/20170705_challenge_322_intermediate_largest/

"use strict";

const isPalindrome = (number) => {
    let nStr = "" + number;
    let end = nStr.length;
    let half = end/2;
    for (let i=0; i<half; i++) {
        if (nStr[i] !== nStr[end-i-1])
            return false;
    }
    return true;
}

const getLargestPalindromeWithNLengthFactors = (n) => {
    let max = Math.pow(10,n)-1;
    let min = Math.pow(10,n-1);
    let res = 0;

    for (let i=max; i>=min; i--) {
        for (let j=i; j>=min; j--) {
            let temp = i*j;
            if (temp < res) break;

            if (isPalindrome(temp)) {
                res = temp;
            }
        }
    }
    return res;
}

console.time("timing")
console.log(getLargestPalindromeWithNLengthFactors(1));
console.log(getLargestPalindromeWithNLengthFactors(2));
console.log(getLargestPalindromeWithNLengthFactors(3));
console.log(getLargestPalindromeWithNLengthFactors(4));
console.log(getLargestPalindromeWithNLengthFactors(5));
console.log(getLargestPalindromeWithNLengthFactors(6));
console.timeEnd("timing");