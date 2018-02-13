// https://www.reddit.com/r/dailyprogrammer/comments/7x81yg/20180213_challenge_351_easy_cricket_scoring/

"use strict";

function swapPlayers(players) {
    players.push(players.shift());
}

function outputResult(results) {
    results.players.forEach((val,index) => {
        console.log(`P${index+1}: ${val}`);
    });
    console.log("Extras: " + results.extras);
    console.log();
}

function cricketScoring(scoreString) {
    let legalBalls = 0;
    let playerScores = [0,0];
    let activePlayers = [0,1];
    let extraPoints = 0;
    
    scoreString.split("").forEach(val => {
        // as 'w' is the only exception, we can generally add a legal ball
        legalBalls++;
        switch(val) {
            case "W":
                let lost = activePlayers.shift();
                playerScores.push(0);
                activePlayers.unshift(playerScores.length-1);
                break;
            case "b":
                extraPoints++;
                swapPlayers(activePlayers);
            case "w":
                extraPoints++;
                // take away the previously added legal ball
                legalBalls--;
                break;
            case ".":
                break;
            default:
                let score = parseInt(val);
                playerScores[activePlayers[0]] += score;
                if (score % 2 == 1) {
                    swapPlayers(activePlayers);
                }
        }

        if (legalBalls == 6) {
            legalBalls = 0;
            swapPlayers(activePlayers);
        }
    })

    return {
        players: playerScores,
        extras: extraPoints
    }
}

console.time("cricketScores");
outputResult(cricketScoring("1.2wW6.2b34"));
outputResult(cricketScoring("WWWWWWWWWW"));
outputResult(cricketScoring("1..24.w6"));
console.timeEnd("cricketScores");