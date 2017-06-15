// https://www.reddit.com/r/dailyprogrammer/comments/6h9woe/20160614_challenge_319_intermediate_worm_wars_1/

"use strict";

const simulateEpidemic = (pop, inf, transRates, iterations = 1000) => {
    let susceptible = pop - inf;
    let infected = inf;
    let immune = 0;
    let count = 0;

    let rates = transRates.shift();

    let data = {
        susceptible: [susceptible],
        infected: [infected],
        immune: [immune]
    }

    while(count < iterations) {
        
        if (transRates.length > 0 && count == transRates[0][0]) {
            rates = transRates.shift();
        }

        immune += Math.floor(susceptible * rates[3]) + Math.floor(infected * rates[2]);
        infected = infected + Math.floor(susceptible * rates[1]) - Math.floor(infected * rates[2]);
        susceptible -= Math.floor(susceptible * rates[3]) + Math.floor(susceptible * rates[1]);

        data.susceptible.push(susceptible);
        data.infected.push(infected);
        data.immune.push(immune);

        count++;
    }

    return data;
}

let data = {};
/*
data = simulateEpidemic(10000,10,[
    [0,  0.01,0.01,0.015],
    [100,0.02,0.01,0.015],
    [200,0.02,0.03,0.03]
],1000);*/

data = simulateEpidemic(10758,21,[[0,0.051,0.930,0.178]]);
//data = simulateEpidemic(18450,12,[[0,0.320,0.969,0.306]]);
//data = simulateEpidemic(9337,15,[[0,0.512,0.513,0.984]]);

for (let i=0; i< data.susceptible.length; i++) {
    console.log(`Susceptible: ${data.susceptible[i]} - Infected: ${data.infected[i]} - Immune: ${data.immune[i]}`);
}