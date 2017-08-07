// https://www.reddit.com/r/dailyprogrammer/comments/6qutez/20170801_challenge_325_easy_color_maze/

"use strict";

var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
})

let lines = [];
rl.on("line", line => {
    lines.push(line);
})
rl.on("close", () => {
    let sequence = lines[0].split(" ");
    let maze = [];
    for (let i=1; i<lines.length; i++) {
        maze.push(lines[i].split(" "));
    }
    searchMazePath(maze,sequence);
})

const searchMazePath = (maze, sequence) => {

    findStartingPositions(maze,sequence[0]).forEach(start => {
        let paths = [];
        let firstEntry = {
            x: start.x,
            y: start.y,
            seqPos: 0
        }
        searchMazePathRec(maze,start.x,start.y,sequence,0,paths,[firstEntry]);
        if (paths.length != 0) {
            paths.forEach(path => drawPath(maze[0].length,maze.length,path,sequence));
        }
    })

    rl.close();
}

const drawPath = (width,height,path,sequence) => {
    let maze = [];
    for (let i=0; i<height; i++) {
        let row = [];
        for (let j=0; j<width;j++) {
            row.push("/");
        }
        maze.push(row);
    }

    path.forEach(step => {
        maze[step.y][step.x] = sequence[step.seqPos];
    })

    console.log(maze.map(line => line.join("")).join("\n"));
    console.log("");
}

const searchMazePathRec = (maze, x,y,sequence,seqPos, paths, currentPath) => {
    // we reached the first line
    if (y==0) {
        paths.push(currentPath);
        return;
    }

    let hasLoop = currentPath.some((step,index) => {
        return step.x === x && step.y === y && step.seqPos === seqPos && index != currentPath.length-1;
    });
    if (hasLoop) {
        return;
    }

    seqPos = (seqPos+1) % sequence.length;

    // look left
    if (x>0 && maze[y][x-1] === sequence[seqPos]) {
        searchMazePathRec(maze,x-1,y,sequence,seqPos,paths,currentPath.concat({x:x-1,y:y,seqPos:seqPos}));
    }
    // look right
    if (x<maze[0].length-1 && maze[y][x+1] === sequence[seqPos]) {
        searchMazePathRec(maze,x+1,y,sequence,seqPos,paths,currentPath.concat({x:x+1,y:y,seqPos:seqPos}));
    }
    // look up
    if (y>0 && maze[y-1][x] === sequence[seqPos]) {
        searchMazePathRec(maze,x,y-1,sequence,seqPos,paths,currentPath.concat({x:x,y:y-1,seqPos:seqPos}));
    }
    // look down
    if (y<maze.length-1 && maze[y+1][x] === sequence[seqPos]) {
        searchMazePathRec(maze,x,y+1,sequence,seqPos,paths,currentPath.concat({x:x,y:y+1,seqPos:seqPos}));
    }
}

// look in the last line to find positions where the path through the maze could start
const findStartingPositions = (maze,firstColor) => {
    let lastRow = maze.length-1;
    let starting = [];
    for (let i=0; i<maze[lastRow].length; i++) {
        if (maze[lastRow][i] == firstColor) {
            starting.push({
                x: i,
                y: lastRow
            })
        }
    }
    return starting;
}