// https://www.reddit.com/r/dailyprogrammer/comments/pr2xr/2152012_challenge_7_easy/

"use strict";

const alph = [
    ["A",".-"],
    ["B","-..."],
    ["C","-.-."],
    ["D","-.."],
    ["E","."],
    ["F","..-."],
    ["G","--."],
    ["H","...."],
    ["I",".."],
    ["J",".---"],
    ["K","-.-"],
    ["L",".-.."],
    ["M","--"],
    ["N","-."],
    ["O","---"],
    ["P",".--."],
    ["Q","--.-"],
    ["R",".-."],
    ["S","..."],
    ["T","-"],
    ["U","..-"],
    ["V","...-"],
    ["W",".--"],
    ["X","-..-"],
    ["Y","-.--"],
    ["Z","--.."],
    ["0","-----"],
    ["1",".----"],
    ["2","..---"],
    ["3","...--"],
    ["4","....-"],
    ["5","....."],
    ["6","-...."],
    ["7","--..."],
    ["8","---.."],
    ["9","----."]
]

const morseToPlain = (morse) => {
    let words = morse.split(" / ");
    let result = [];

    return words.map(word => {
        return word.split(" ").map(letter => {
            return alph.filter(a => a[1]== letter)[0][0] || "?";
        }).join("");
    }).join(" ");
}

const plainToMorse = (plain) => {
    plain = plain.toUpperCase().split(" ");

    return plain.map(word => {
        return word.split("").map(letter => {
            return alph.filter(a => a[0] == letter)[0][1] || "?";
        }).join(" ");
    }).join(" / ");
}

console.log(morseToPlain(".... . .-.. .-.. --- / -.. .- .. .-.. -.-- / .--. .-. --- --. .-. .- -- -- . .-. / --. --- --- -.. / .-.. ..- -.-. -.- / --- -. / - .... . / -.-. .... .- .-.. .-.. . -. --. . ... / - --- -.. .- -.--"))
console.log(plainToMorse("Hello World"));