// https://www.reddit.com/r/dailyprogrammer/comments/6vi9ro/170823_challenge_328_intermediate_pyramid_sliding/
"use strict";

var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
})

let lines = [];
rl.on("line", line => {
    lines.push(line);
})
rl.on("close", () => {
    // remove first line with input length
    lines.shift();

    // convert the string lines to a multidimensional int-array
    lines = lines.map(line => line.split(" ").map(string => parseInt(string)));
    
    console.log(pyramidSliding(lines));
})


const pyramidSliding = (pyramid) => {
    // start at second to last line and move slowly up the pyramid
    for (let i=pyramid.length-2; i>=0; i--) {
        // for each entry of the current line, check its successors and add to smaller one to the entry
        for (let j=0; j<pyramid[i].length; j++) {
            pyramid[i][j] += Math.min(pyramid[i+1][j],pyramid[i+1][j+1]);
        }
    }
    // the shortest path has reached to top of the pyramid
    return pyramid[0][0];
}


