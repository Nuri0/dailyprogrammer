// https://www.reddit.com/r/dailyprogrammer/comments/pnhyn/2122012_challenge_5_easy/

"use strict";

const readline = require("readline");
const userData = require("./userData.json");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.on("SIGINT", () => {
    console.log("\nClosing the application");
    rl.close();
})

const checkUserName = () => {
    return new Promise((resolve,reject) => {
        rl.question("Username:", (user) => {
            if (!userData[user]) {
                reject("Access denied. Unknown user.");
            } else {
                resolve(user);
            }
        })
    })
}

const checkUserPassword = (user) => {
    return new Promise((resolve,reject) => {
        rl.question("Password:", (passwd) => {
            if (passwd != userData[user].password) {
                reject("Access denied. Incorrect password.");
            } else {
                resolve();
            }
        })
    })
}

const privateArea = () => {
    console.log("You have been granted access to the private area! Now you can ... type things ... so they can be printed out again. Yeah ... \n (Quit with Ctrl+C)")
    rl.on("line",(line) => {
        console.log(line);
    })
}

checkUserName()
    .then(checkUserPassword)
    .then(privateArea)
    .catch(error => {
        console.log(error);
        rl.close();
    });
