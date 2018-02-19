// https://www.reddit.com/r/dailyprogrammer/comments/qr0hg/3102012_challenge_22_easy/

"use strict";

function addToArray(arr1, arr2) {

    // concat filtered arr2 to arr1
    return arr1.concat(arr2.filter(val => {
        return arr1.indexOf(val) == -1;
    }))
}

console.time("test");
console.log(addToArray(["a","b","c",1,4,], ["a", "x", 34, "4"]));
console.timeEnd("test");