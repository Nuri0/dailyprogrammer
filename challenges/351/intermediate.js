// https://www.reddit.com/r/dailyprogrammer/comments/7xkhar/20180214_challenge_351_intermediate_permutation/

"use strict";

const fs = require("fs");
const path = require("path");

function readFile(filename) {
    return fs.readFileSync(path.join(__dirname,filename),"utf-8").split(/\r?\n/g);
}

function spin(array,n) {
    for (let i=0; i<n; i++) {
        array.unshift(array.pop());
    }
}

function exchange(array, a, b) {
    let swap = array[a];
    array[a] = array[b];
    array[b] = swap;
}

function partner(array, a, b) {
    let indices = [];
    array.forEach((val,index) => {
        if (val.startIndex == a)
            indices.push(index);

        if (val.startIndex == b)
            indices.push(index);
    })

    exchange(array,indices[0],indices[1]);
}

function permutationMadness(string,operations) {
    let ops = operations.split(",");

    let progs = string.split("");
    progs = progs.map((el,index) => {
        return {
            value: el,
            startIndex: index
        }
    })

    let vals;

    ops.forEach(op => {
        switch(op[0]) {
            case 's':
                spin(progs,parseInt(op.substring(1)))
                break;
            case 'x':
                vals = op.substring(1).split("/");
                exchange(progs,parseInt(vals[0]),parseInt(vals[1]));
                break;
            case 'p':
                vals = op.substring(1).split("/");
                partner(progs,parseInt(vals[0]),parseInt(vals[1]));
                break;
        }
    });

    progs = progs.map(val => val.value);

    return progs.join("");
}

console.log(permutationMadness("abcde","s1,x3/4,p4/1"));
console.log(permutationMadness("dbagcfe","s4,s5,x5/3,x5/6,s5,s3,x0/3,x3/6,x6/0,x2/3,x3/5,s5,s5,s5,s1,s5,s3,s3,x2/3,x1/0,s1,s1,s1,s4,x1/3,x4/2,x5/1,x6/0,s2,x2/1"));
console.log(permutationMadness(...readFile("challenge_input_1.txt")));
console.log(permutationMadness(...readFile("challenge_input_2.txt")));
