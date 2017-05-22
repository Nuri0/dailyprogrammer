// https://www.reddit.com/r/dailyprogrammer/comments/6bumxo/20170518_challenge_315_intermediate_game_of_life/

"use strict";

if (process.argv.length < 5) {
    console.error("Usage: node intermediate.js {width} {height} {iterations}");
    process.exit();
}

const WIDTH = parseInt(process.argv[2]);
const HEIGHT = parseInt(process.argv[3]);
const ITERATIONS = parseInt(process.argv[4]);

const ALIVE_CHANCE = 0.45;
const RED_CHANCE = 0.5; // chance for a living cell to be red
// const BLUE_CHANCE = 1 - RED_CHANCE;

const RED_SYMBOL = "#";
const BLUE_SYMBOL = "*";
const OFF_SYMBOL = ".";

const initiateGrid = () => {
    let grid = [];
    for (let i=0; i<HEIGHT; i++) {
        let row = [];
        for (let j=0; j<WIDTH; j++) {
            if (Math.random() < ALIVE_CHANCE) {
                if (Math.random() < RED_CHANCE) {
                    row.push("#");
                } else {
                    row.push("*");
                }
            } else {
                row.push(".");
            }
        }
        grid.push(row);
    }
    return grid;
}

const getNeighbours = (grid,x,y) => {
    let nb = [];

    let xm = (x==0 ? WIDTH-1 : x-1);
    let xp = (x+1)%WIDTH;
    let ym = (y==0 ? HEIGHT-1 : y-1);
    let yp = (y+1)%HEIGHT;

    nb.push(grid[ym][xm]);  // up left
    nb.push(grid[ym][x]);   // above
    nb.push(grid[ym][xp]);  // up right
    nb.push(grid[y][xp]);   // right
    nb.push(grid[yp][xp]);  // down right
    nb.push(grid[yp][x]);   // below
    nb.push(grid[yp][xm]);  // down left
    nb.push(grid[y][xm]);   // left

    return nb;
}

const computeNextIteration = (newGrid, oldGrid) => {

    for (let i=0; i<HEIGHT; i++) {
        for (let j=0; j<WIDTH; j++) {
            // get all neighbours
            let nb = getNeighbours(oldGrid,j,i);
            
            // get different sets of neighbours
            let empty = nb.filter(n => n == OFF_SYMBOL);
            let red = nb.filter(n => n == RED_SYMBOL);
            let blue = nb.filter(n => n == BLUE_SYMBOL);
            let kin = nb.filter(n => n == oldGrid[i][j]);
            let other = nb.filter(n => n !== oldGrid[i][j] && n !== OFF_SYMBOL);

            // empty and has exactly 3 neighbours
            if (oldGrid[i][j] == OFF_SYMBOL && (red.length + blue.length) == 3) {
                if (red.length > blue.length) {
                    newGrid[i][j] = RED_SYMBOL;
                } else {
                    newGrid[i][j] = BLUE_SYMBOL;
                }

            } else {

                // die from over- or underpopulation
                if (empty.length > 6 || empty.length < 5) {
                    newGrid[i][j] = OFF_SYMBOL;
                } else {

                    if (kin.length < other.length) {
                        // more of the other color => change color
                        if (oldGrid[i][j] == RED_SYMBOL) {
                            newGrid[i][j] = BLUE_SYMBOL;
                        } else {
                            newGrid[i][j] = RED_SYMBOL;
                        }
                        
                    } else {
                        // more of the own color => everything stays the same
                        newGrid[i][j] = oldGrid[i][j];
                        
                    }

                }

            }
        }
    }

    return newGrid;
}

const outputGrid = (grid) => {
    console.log(grid.map(row => row.join("")).join("\n"));
}


let grid1 = initiateGrid();
let grid2 = initiateGrid(); // only initiate so that is has the correct dimensions
let swap;

for (let i=0; i<ITERATIONS; i++) {
    outputGrid(grid1);
    console.log()

    computeNextIteration(grid2,grid1);

    swap = grid2;
    grid2 = grid1;
    grid1 = swap;
}

outputGrid(grid1);