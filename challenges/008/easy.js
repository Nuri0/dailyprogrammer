// https://www.reddit.com/r/dailyprogrammer/comments/pserp/2162012_challenge_8_easy/

"use strict";

const getBottleSong = () => {
    let text = "";

    for (let bottles = 99; bottles > 0; bottles--) {
        text += `${bottles} bottle${bottles>1?"s":""} of beer on the wall, ${bottles} bottle${bottles>1?"s":""} of beer.\n`;
        text += `Take on down and pass it around, ${bottles-1>0? bottles-1 : "no more"} bottle${bottles-1!==1?"s":""} of beer on the wall.\n\n`;
    }

    text += `No more bottles of beer on the wall, no more bottles of beer. 
Go to the store and buy some more, 99 bottles of beer on the wall.`

    return text;
}

console.log(getBottleSong());