// https://www.reddit.com/r/dailyprogrammer/comments/6v29zk/170821_challenge_328_easy_latin_squares/

"use strict";

// https://stackoverflow.com/a/17428705/2505074
const transposeGrid = (grid) => {
    return grid[0].map((col,i) => {
        return grid.map(row => {
            return row[i];
        })
    })
}

const reduceGrid = (grid) => {

    const sortFunc = (row1, row2) => row1[0]-row2[0];

    // sort rows
    grid.sort(sortFunc)

    // sort cols
    grid = transposeGrid(grid);
    grid.sort(sortFunc);
    grid = transposeGrid(grid);

    return grid;
}

const isLatin = (dim, square) => {
    let grid = [];
    let data = square.split(" ").map(char => parseInt(char));

    
    let numbers = [];
    let sum = 0;
    data.forEach(element => {
        sum += element;
        if (numbers.indexOf(element) == -1)
            numbers.push(element);
    })
    
    // more than n different numbers
    if (numbers.length > dim) return false;

    let rowSum = numbers.reduce((acc,element) => acc + element,0);

    // quick test to compare sum of all numbers and those of one row/column
    if (sum != rowSum * dim) return false;

    for (let i=0; i<dim; i++) {
        let row = [];
        for (let j=0; j<dim; j++) {
            row.push(data[i*dim+j]);
        }
        grid.push(row);
    }

    // check rows
    grid.forEach(row => {
        let s = row.reduce((acc,elem) => acc + elem,0);
        if (s != rowSum) return false;
    })

    // check columns
    for (let i=0; i<dim; i++) {
        let colSum = 0;
        for (let j=0; j<dim; j++) {
            colSum += grid[j][i];
        }
        if (colSum != rowSum) return false;
    }

    return reduceGrid(grid);
}

console.log(isLatin(5,"1 2 3 4 5 5 1 2 3 4 4 5 1 2 3 3 4 5 1 2 2 3 4 5 1"));
console.log(isLatin(2,"1 3 3 4"));
console.log(isLatin(4,"1 2 3 4 1 3 2 4 2 3 4 1 4 3 2 1"));