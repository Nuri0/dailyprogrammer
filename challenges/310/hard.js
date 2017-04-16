// https://www.reddit.com/r/dailyprogrammer/comments/65fkwh/20170414_challenge_310_hard_the_guards_and_the/
"use strict";

const checkTowerTriangleWithMansion = (t1, t2, t3) => {
    // compute shortest distance from vector/line between two towers and the center of the mansion at (0,0) 
    // the parameters are choosen so that we simulate a 'roundtrip' along the triangle
    let dist1 = towerVectorToMansionDistance(t1,t2);
    let dist2 = towerVectorToMansionDistance(t2,t3);
    let dist3 = towerVectorToMansionDistance(t3,t1);

    // as the distance is not an absolute value, it contains the information of the direction relative to the vector
    // if all directions are the same then we know that the coordinate (0,0) is inside the triangle
    if (Math.sign(dist1) !== Math.sign(dist2) || Math.sign(dist1) !== Math.sign(dist3)) {
        return false;
    }

    // lastly check if we do not cross the circle shaped mansion
    return Math.abs(dist1) >= 1 && Math.abs(dist2) >= 1 && Math.abs(dist3) >= 1;
    
}

const towerVectorToMansionDistance = (t1,t2) => {
    /*
    * https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line
    * simplified as the target point is (0,0)
    * 'c / sqrt(a*a+b*b)'
    */
    return (t2.x*t1.y - t1.x*t2.y) / Math.sqrt(Math.pow(t2.y - t1.y,2)+Math.pow(t1.x - t2.x,2));
}

const computeMansionEnclosure = (input)=> {

    let towers = input.split("\n").map(line => {
        return {
            x: parseInt(line.split(" ")[0]),
            y: parseInt(line.split(" ")[1])
        }
    });

    let handledTowers = [];
    let sum = 0;
    for (let i=0; i<towers.length; i++) {
        let current = towers[i];
        let count = 0;

        // if we have at least two other towers ...
        if (handledTowers.length >= 2) {
            // ... check with all possible combinations, if an enclosure with the towers is possible
            for (var j=0; j<handledTowers.length-1; j++) {
                for (var k=j+1; k<handledTowers.length; k++) {
                    if (checkTowerTriangleWithMansion(current, handledTowers[j],handledTowers[k])) 
                        count++;
                }
            }
        }

        sum += count;
        console.log(sum);
        handledTowers.push(current);
    }
}

var towers1 = `3 -1
-1 3
-1 -1
-5 -2`

var towers2 = `2 -7
2 2
4 -9
-4 -6
9 3
-8 -7
6 0
-5 -6
-1 -1
-7 10`

console.log("output for basic input");
computeMansionEnclosure(towers1);
console.log("");
console.log("output for challenge input");
computeMansionEnclosure(towers2);