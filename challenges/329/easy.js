// https://www.reddit.com/r/dailyprogrammer/comments/6wjscp/2017828_challenge_329_easy_nearest_lucky_numbers/

"use strict";

const nearestLuckyNumber = (number) => {
    let luckies = [];

    for (let i=1; i<number*2; i++) {
        luckies.push(i);
    }

    let position = 0;
    let step = 2;

    while(position < luckies.length) {
        luckies = luckies.filter((el,index) => {
            return (index+1) % step;
        })
        position++;
        step = luckies[position];
    }

    if (luckies.indexOf(number) == -1) {
        let index = 0;
        while (luckies[index] < number) index++;

        return `${luckies[index-1]} < ${number} < ${luckies[index]}`;
    } else {
        return number + " is lucky number";
    }

    // return luckies;
}

console.log(nearestLuckyNumber(103));
console.log(nearestLuckyNumber(224));
console.log(nearestLuckyNumber(997));