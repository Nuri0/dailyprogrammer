// https://www.reddit.com/r/dailyprogrammer/comments/6e08v6/20170529_challenge_317_easy_collatz_tag_system/

"use strict";

const collatzSequence = [
    {symbol: "a", word: "bc"},
    {symbol: "b", word: "a"},
    {symbol: "c", word: "aaa"}
]

const applyTagSystem = (m,ruleSet, word) => {
    let steps = [word];
    while (word.length >= m) {
        let rule = ruleSet.filter(rule => word.startsWith(rule.symbol))[0];
        word = word.substr(2) + rule.word;
        steps.push(word);
    }
    return steps;
}

const printItem = (item) => console.log(item);

applyTagSystem(2,collatzSequence,"aaa").forEach(printItem);
console.log();
applyTagSystem(2,collatzSequence,"aaaaaaa").forEach(printItem);