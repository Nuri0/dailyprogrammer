// https://www.reddit.com/r/dailyprogrammer/comments/7s888w/20180122_challenge_348_easy_the_rabbit_problem/

"use strict";

const rabbitProblem = (m,f,neededAlive) => {
    let males = new Array(96).fill(0);
    males[2] = m;
    let females = new Array(96).fill(0);
    females[2] = f;

    let popSize = m+f;
    let counter = 0;
    let deaths = 0;

    while(popSize < neededAlive) {
        // remove dying rabbits
        let newDeaths = males.pop() + females.pop();
        deaths += newDeaths;
        popSize -= newDeaths;

        // prepare newborn rabbits
        males.unshift(0);
        females.unshift(0);

        // as the arrays have already been shifted, the loop has to start at index 5
        // (females rabbits that become 4 months old in the last generation)
        for (let i=5; i<females.length; i++) {
            males[0] += females[i]*5;
            females[0] += females[i]*9;
        }

        popSize += males[0] + females[0];

        counter++;
    }

    return {generations:counter, deaths:deaths};
}

console.log(rabbitProblem(2,4,1000000000));
console.log(rabbitProblem(2,4,15000000000));