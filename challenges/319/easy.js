// https://www.reddit.com/r/dailyprogrammer/comments/6grwny/20170612_challenge_319_easy_condensing_sentences/

"use strict";

const condenseSentence = (sentence) => {
    let words = sentence.split(" ");
    for (let i=0; i<words.length-1; i++) {

        let suffix = "";
        let maxLength = 0;

        for (let j=1; j<=words[i+1].length; j++) {
            if (words[i].endsWith(words[i+1].substr(0,j))) {
                maxLength = j;
            }
        }

        if (maxLength > 0) {
            words[i+1] = words[i] + words[i+1].substr(maxLength);
            words[i] = "";
        }

    }

    words = words.filter(word => word != "");

    return words.join(" ");
}

// https://www.reddit.com/r/dailyprogrammer/comments/6grwny/20170612_challenge_319_easy_condensing_sentences/dismsz7/
const condenseSentenceRegex = (sentence) => {
    return sentence.replace(/(\w+)\s+\1/gi,"$1");
}

console.log("Own Method:");
console.log("###########");
console.log(condenseSentence("I heard the pastor sing live verses easily."));
console.log(condenseSentence("Deep episodes of Deep Space Nine came on the television only after the news."));
console.log(condenseSentence("Digital alarm clocks scare area children."));
console.log();

console.log("Regex-Method:");
console.log("#############");
console.log(condenseSentenceRegex("I heard the pastor sing live verses easily."));
console.log(condenseSentenceRegex("Deep episodes of Deep Space Nine came on the television only after the news."));
console.log(condenseSentenceRegex("Digital alarm clocks scare area children."));