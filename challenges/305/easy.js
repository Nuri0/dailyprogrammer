// https://www.reddit.com/r/dailyprogrammer/comments/5xu7sz/20170306_challenge_305_easy_permutation_base/

"use strict"

var getValueForIndex = (index) => {
    var value = (index+2).toString(2);
    return value.substring(1);
}

var getIndexForValue = (value) => {
    value = "1" + value;
    return parseInt(value,2)-2;
}

console.log("value(54) = " + getValueForIndex(54));
console.log("index(111000111) = " + getIndexForValue(111000111));
console.log("");
console.log("challenge inputs:");
console.log("value(234234234) = " + getValueForIndex(234234234));
console.log("value(234234234234234) = " + getValueForIndex(234234234234234));
console.log("value(234234234234234234234234) = " + getValueForIndex(234234234234234234234234) + "   <- wrong!");
console.log("index(000111000111111000111111000111111000111) = " + getIndexForValue("000111000111111000111111000111111000111"));
console.log("index(11111111000111000111111000111111000111111000111) = " + getIndexForValue("11111111000111000111111000111111000111111000111"));