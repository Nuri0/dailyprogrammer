// https://www.reddit.com/r/dailyprogrammer/comments/7i1ib1/20171206_challenge_343_intermediate_mozarts/

"use strict";

const fs = require("fs");
const path = require("path");

const throwDice = () => {
    return Math.floor(Math.random() * 5) + 1;
}

const twoSixSidedDice = () => {
    return throwDice() + throwDice();
}

const getMeasures = () => {
    let notesData = fs.readFileSync(path.join(__dirname, "mozart-dice-starting.txt"), "utf-8");
    let notes = notesData.split("\n").map(line => line.split(" "));

    // split into measures
    let measures = [];
    for (let i = 0; i < 176; i++) {
        measures.push([]);
    }
    notes.forEach(note => {
        let measure = Math.floor(note[1] / 3);
        measures[measure].push(note);
    })

    return measures;
}

const getRandomizerTable = () => {
    let randData = fs.readFileSync(path.join(__dirname,"randomizer.txt"),"utf-8");
    return randData.split("\n").map(line => line.split(" ").map(data => parseInt(data)));
}

const compose = () => {
    let measures = getMeasures();
    let rand = getRandomizerTable();

    let composition = [];
    for (let i=0; i<16; i++) {
        let index = rand[i][twoSixSidedDice()-2];

        // adjust the starting point of the measure
        let newMeasure = measures[index-1];
        newMeasure.map(note => {
            note[1] = note[1]-3*(index-i-1);
            return note;
        })
        composition = composition.concat(measures[index-1]);
    }

    return composition;
}

const outputComposition = (composition) => {
    composition.forEach(note => console.log(note.join(" ")));
}

outputComposition(compose());