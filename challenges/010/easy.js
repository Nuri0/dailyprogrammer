// https://www.reddit.com/r/dailyprogrammer/comments/pv98f/2182012_challenge_10_easy/

"use strict";

// https://www.reddit.com/r/dailyprogrammer/comments/pv98f/2182012_challenge_10_easy/c3sk141/
let testReg = /^((\d{3}(\.|\-)?)|(\(\d{3}\) ?))?\d{3}(\3|-)?\d{4}/

const validTelephoneNumber = (number) => {
    return testReg.test(number);
}

let numbers = [
    "1234567890",
    "123-456-7890",
    "123.456.7890",
    "(123)456-7890",
    "(123) 456-7890",
    "456-7890",
    "123-45-6789",
    "123:4567890",
    "123/4567890"
]

numbers.forEach(number => {
    console.log(`Is ${number} a valid telephone number? => ${validTelephoneNumber(number)}`);
})