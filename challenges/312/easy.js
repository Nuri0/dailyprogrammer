// https://www.reddit.com/r/dailyprogrammer/comments/67dxts/20170424_challenge_312_easy_l33tspeak_translator/

"use strict";

let alp = [
    ["A","4"],
    ["B","6"],
    ["E","3"],
    ["L","1"],
    ["I","1"],
    ["V","\\/"],
    ["M","(V)"],
    ["N","(\)"],
    ["O","0"],
    ["S","5"],
    ["T","7"],
    ["W","`//"]
]

const l33tConversion = (text,l33t) => {
    text = text.toUpperCase();
    alp.forEach(sub => {
        if (l33t) {
            // expensive for longer strings!!!
            text = text.split(sub[1]).join(sub[0]);
        } else {
            // expensive for longer strings!!!
            text = text.split(sub[0]).join(sub[1]);
        }
    })
    return text;
}

const convertNormalToL33t = (text) => {
    return l33tConversion(text,false);
}

const convertL33tToNormal = (text) => {
    return l33tConversion(text,true);
}

console.log("Base output");
console.log(convertL33tToNormal("31337"));
console.log(convertNormalToL33t("storm"));
console.log("");
console.log("Challenge output");
console.log(convertNormalToL33t("I am elite."));
console.log(convertNormalToL33t("Da pain!"));
console.log(convertNormalToL33t("Eye need help!"));
console.log(convertL33tToNormal("3Y3 (\)33d j00 t0 g37 d4 d0c70r."));
console.log(convertL33tToNormal("1 n33d m4 p1llz!"));


