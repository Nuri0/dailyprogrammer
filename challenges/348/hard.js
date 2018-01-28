// https://www.reddit.com/r/dailyprogrammer/comments/7t6fnc/20180126_challenge_348_hard_square_sum_chains/

"use strict";

const dfs = (node,neighbours,stack,n) => {

    if (stack.length == n)
        return;

    neighbours[node].forEach(nb => {
        // node hasn't been used yet
        if (stack.indexOf(nb) == -1) {
            stack.push(nb);
            dfs(nb,neighbours,stack,n);

            if (stack.length == n)
                return;

            stack.pop();
        }
    })
}

const getNeighbours = (n) => {
    let nbs = [[]];

    for (let i=1; i<=n; i++) {
        nbs.push([]);
        for (let j=1; j<=n; j++) {
            if (i==j) continue;

            if (Number.isInteger(Math.sqrt(i+j))) {
                nbs[i].push(j);
            }

        }
    }

    return nbs;
}


const squareSumChains = (n) => {
    let neighbours = getNeighbours(n);

    let stack = [];
    for (let i=1; i<=n; i++) {
        stack.push(i);
        dfs(i,neighbours,stack,n);

        if (stack.length == n) {
            break;
        } else {
            stack.pop();
        }
    }

    if (stack.length == n) {
        return stack.join(" ");
    } else {
        return "Not possible";
    }
}

console.time("time");
console.log(squareSumChains(15));
console.log(squareSumChains(8));
console.log(squareSumChains(23));
console.log(squareSumChains(24));
console.log(squareSumChains(25));

/*
    Be careful before uncommenting! Might take a very long time to solve this with the provided algorithm. 

    Idee:

    Indizes sortieren nach Anzahl der Nachbarknoten
*/
// console.log(squareSumChains(256));

console.timeEnd("time");