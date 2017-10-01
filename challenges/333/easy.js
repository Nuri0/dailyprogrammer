// https://www.reddit.com/r/dailyprogrammer/comments/72ivih/20170926_challenge_333_easy_packet_assembler/

"use strict";

let readline = require("readline");
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let msgBuffer = {};

const parseLine = (line) => {
    console.log(line);
    
}

let reg = /(\d+)\s+(\d+)\s+(\d+)\s+([\w\s',.\-äÄöÖüÜ]+)/;

rl.on("line", (line) => {
    let packet = reg.exec(line);

    // check if we've already seen a packet from this msgId
    if (!msgBuffer[packet[1]]) {
        msgBuffer[packet[1]] = [];
    }

    msgBuffer[packet[1]].push(packet);

    // start the output, if we have received every packet
    if (msgBuffer[packet[1]].length == packet[3]) {

        // sort the packets for the message
        msgBuffer[packet[1]] = msgBuffer[packet[1]].sort((p1,p2) => {
            return p1[2] - p2[2];
        })

        console.log(`Messages for ID "${packet[1]}":`);
        msgBuffer[packet[1]].forEach(p => {
            console.log(p[4]);
        })
        console.log();
    }

});