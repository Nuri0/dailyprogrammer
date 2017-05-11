// https://www.reddit.com/r/dailyprogrammer/comments/6aefs1/20170510_challenge_314_intermediate_comparing/

"use strict";

    const lexMinStringRotation = (string) => {
        let suffixes = string.split("").map((c,index) => {
            return {
                value: string.slice(index),
                index: index
            };
        }).sort((a,b) => a.value.localeCompare(b.value));
        
        return `${suffixes[0].index} ${suffixes[0].value}${string.slice(0,suffixes[0].index)}`
    }

console.log(lexMinStringRotation("aabbccddbbaabb"));
console.log(lexMinStringRotation("onion"));
console.log(lexMinStringRotation("bbaaccaadd"));
console.log(lexMinStringRotation("alfalfa"));
console.log(lexMinStringRotation("weugweougewoiheew"));
console.log(lexMinStringRotation("pneumonoultramicroscopicsilicovolcanoconiosis"));
console.log(lexMinStringRotation("abayabaxabaz"));
