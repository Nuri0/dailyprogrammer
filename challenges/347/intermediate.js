// https://www.reddit.com/r/dailyprogrammer/comments/7r17qr/20180117_challenge_347_intermediate_linear/

"use strict";

// compute xor of inputs of arbitrary size
const xor = (inputs) => {
    let start = inputs.shift();
    return inputs.reduce((acc,input) => acc^input,start);
}

// compute xnor of inputs of arbitrary size
const xnor = (inputs) => {
    let start = inputs.shift();
    return inputs.reduce((acc,input) => 1-(acc^input),start);
}

const lfsr = (tap,func,init,steps) => {
    // convert parameter into register
    let register = init.split("").map(val => parseInt(val));

    // initial output
    console.log(`0 ${register.join("")}`);

    for (let i=0; i<steps; i++) {
        // get the values the tap indices are pointing to
        let inputs = register.filter((el,index) => tap.indexOf(index) != -1);

        // calling the appropriate feedback function
        let result;
        switch(func) {
            case "XOR": result = xor(inputs); break;
            case "XNOR": result = xnor(inputs); break;
        }

        // remove oldest values
        register.pop();
        // add new values
        register.unshift(result)

        console.log(`${i+1} ${register.join("")}`);
    }

    console.log();
}

lfsr([0,2],"XOR","001",7);
lfsr([1,2],"XOR","001",7);
lfsr([0,2],"XNOR","001",7);
lfsr([1,2,3,7],"XOR","00000001",16);
lfsr([1,5,6,31],"XOR","00000000000000000000000000000001",16);