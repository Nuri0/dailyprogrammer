// https://www.reddit.com/r/dailyprogrammer/comments/pu2c0/2172012_challenge_9_difficult/

"use strict";

const getNthPyramidLine = n => {
    let line = "1";
    while (n > 1) {
        let newLine = "";
        let c = line[0];
        let amount = 1;
        for (let i=1; i<line.length; i++) {
            if (line[i] != c) {
                newLine += amount + "" + c;
                c = line[i];
                amount = 1;
            } else {
                amount++;
            }
        }
        newLine += amount + "" + c
        line = newLine;

        n--;
    }

    return line;
}

console.log(getNthPyramidLine(40));