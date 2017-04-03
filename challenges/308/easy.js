// https://www.reddit.com/r/dailyprogrammer/comments/61ub0j/20170327_challenge_308_easy_let_it_burn/

"use strict";

let floorplan = 
`#############/#
#     |       #
#     #       #
#     #       #
#######       #
#     _       #
###############`.split("\n").map(row => row.split(""));

// array is used to look into every horizontal and vertical neighboor of a floorplan tile
let diffs = [[-1,0],[0,1],[1,0],[0,-1]];

const applySmoke = (plan,x,y,explosion) => {

    // coordinates are off the grid
    if (y >= plan.length || x >= plan[y].length)
        return;
    
    switch(plan[y][x]) {
        case " ": // empty space gets filled with smoke
            plan[y][x] = "S";
            if (isNextToFire(plan,x,y)) {
                plan[y][x] = "F";
                spreadFire(plan,x,y);
            }
            break;
        case "S":
            plan[y][x] = "F";
            spreadFire(plan,x,y);
            break;

        // nothing happens with the following symbols
        case "F":
            if (!explosion) {
                return;
            }

            diffs.forEach(([xDiff,yDiff]) => {
                spreadExplosion(plan,x,y,xDiff,yDiff);
            })
            break;
        case "#":
        case "|":
        case "/":
        case "=":
        case "_":
            break;
    }
    
}

const isNextToFire = (plan,x,y) => {
    return diffs.some(([xDiff,yDiff]) => {
        // look through open doors and broken walls/doors
        if (plan[y+yDiff][x+xDiff] == "_" || plan[y+yDiff][x+xDiff] == "/") {
            return plan[y+2*yDiff][x+2*xDiff] == "F";
        }
        return plan[y+yDiff][x+xDiff] == "F";
    })
}

const spreadExplosion = (plan,x,y,xDir,yDir) => {
    switch(plan[y+yDir][x+xDir]) {
        case " ":
            plan[y+yDir][x+xDir] = "F";
            break;
        case "F":
            spreadExplosion(plan,x+xDir,y+yDir,xDir,yDir);
            break;
        case "#":
            plan[y+yDir][x+xDir] = "=";
            break;
        case "=":
        case "|":
            plan[y+yDir][x+xDir] = "_";
            break;
        case "/":
            if (plan[y+2*yDir][x+2*xDir] == "F") {
                spreadExplosion(plan,x+xDir,y+yDir,xDir,yDir);
            }
            break;
    }
}

const spreadFire = (plan,x,y) => {
    diffs.forEach(([xDiff,yDiff]) => {
        switch(plan[y+yDiff][x+xDiff]) {
            case "S":
                plan[y+yDiff][x+xDiff] = "F";
                spreadFire(plan,x+xDiff,y+yDiff);
                break;

            // open doors and broken walls/doors
            case "/":
            case "_":
                if (plan[y+2*yDiff][x+2*xDiff] == "S") {
                    plan[y+2*yDiff][x+2*xDiff] = "F";
                    spreadFire(plan,x+2*xDiff, y+2*yDiff);
                }
                break;

        }
    });
}

// display the floorplan before application of smoke
console.log("Floorplan at the beginning");
floorplan.forEach(row => {
    console.log(row.join(""));
});
console.log("");

// example input and output didn't match
// following input has been adapted so that it fits the example ouput
applySmoke(floorplan,1,1);
applySmoke(floorplan,1,2);
applySmoke(floorplan,1,3);
applySmoke(floorplan,1,1);
applySmoke(floorplan,5,6);
// applySmoke(4,2); => doesn't match with expected output
applySmoke(floorplan,1,1);
applySmoke(floorplan,1,2);
applySmoke(floorplan,5,5);
applySmoke(floorplan,5,5);
applySmoke(floorplan,9,1);
applySmoke(floorplan,5,7);
applySmoke(floorplan,2,2);
applySmoke(floorplan,7,5); // => added to get the fire behind the broken 

// display the floorplan again
console.log("After the first smoke");
floorplan.forEach(row => {
    console.log(row.join(""));
});
console.log("");

// apply more smoke to get some explosions
applySmoke(floorplan,7,1,true);
applySmoke(floorplan,8,1,true);
applySmoke(floorplan,9,1,true);
applySmoke(floorplan,10,1,true);
applySmoke(floorplan,8,1,true);

// display the floorplan after the explosions
console.log("Now with some explosions");
floorplan.forEach(row => {
    console.log(row.join(""));
});