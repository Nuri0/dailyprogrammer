// https://www.reddit.com/r/dailyprogrammer/comments/quli5/3132012_challenge_23_easy/

"use strict";

function bisectList(list) {
    /**
     * As the middle element can go to any list (if length is uneven)
     * decide randomly which list will get it (just for fun)
     * 
     * Math.round(Math.random()) randomly return 0 or 1
     */
    let middle = (list.length%2 == 0)?
        list.length/2:                                          // list is even
        Math.floor(list.length/2)+Math.round(Math.random());    // list is uneven
    return [list.slice(0,middle),list.slice(middle)];
}

console.time("bisect");
console.log(bisectList([1,2,3,4,5,6,7,8,9]));
console.log(bisectList([1,2,3,4,5,6,7,8,9,10]));
console.timeEnd("bisect");