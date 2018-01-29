// https://www.reddit.com/r/dailyprogrammer/comments/qit0h/352012_challenge_18_easy/

"use strict";

const convertNumberWithLetters = (number) => {
    return number.split("").map(char => {
        let code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
            code -= 64;

            // Number 7 has 4 characters, so from 'S' all following chars should be shifted left
            if (code >= 19) code--;
            // Number 9 has 4 characters, so 'Z' should be shifted left 
            if (code == 25) code--;

            return Math.ceil(code/3)+1;
        } else {
            return char;
        }
    }).join("");
}

const convertNumberWithLettersSwitch = (number) => {
    return number.split("").map(char => {
        switch (char) {
            case "A":
            case "B":
            case "C": return 2;
            case "D":
            case "E":
            case "F": return 3;
            case "G":
            case "H":
            case "I": return 4;
            case "J":
            case "K":
            case "L": return 5;
            case "M":
            case "N":
            case "O": return 6;
            case "P":
            case "Q":
            case "R":
            case "S": return 7;
            case "T":
            case "U":
            case "V": return 8;
            case "W":
            case "X":
            case "Y":
            case "Z": return 9;
        
            default:
                return char;
        }
    }).join("");
}

console.time("mathematical");
console.log(convertNumberWithLetters("1-800-VERIZON"));
console.log(convertNumberWithLetters("1-800-COMCAST"));
console.timeEnd("mathematical");

console.time("with switch");
console.log(convertNumberWithLettersSwitch("1-800-VERIZON"));
console.log(convertNumberWithLettersSwitch("1-800-COMCAST"));
console.timeEnd("with switch");