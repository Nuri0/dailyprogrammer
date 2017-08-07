// https://www.reddit.com/r/dailyprogrammer/comments/6rb98p/20170803_challenge_325_intermediate_arrow_maze/

"use strict";

const directions = {
    's': {x: 0, y:1},
    'e': {x: 1, y:0},
    'n': {x: 0, y:-1},
    'w': {x: -1, y:0}
}

let input = `e se se sw s
s nw nw n w
ne s h e sw
se n w ne sw
ne nw nw n n`;

const getDirectionForLabel = label => {
    return label.split("").map(c => directions[c]).reduce((acc,elem) => {
        return {
            x: acc.x + elem.x,
            y: acc.y + elem.y
        }
    },{x:0,y:0});
}

const parseMaze = string => {
    let rows = string.split("\n");
    rows = rows.map(row => {
        return row.split(" ");
    })
    return rows;
}

const convertMazeToGraph = maze => {
    // at first convert to string to objects
    for (let i=0; i<maze.length; i++) {
        for (let j=0; j<maze[i].length; j++) {
            maze[i][j] = {
                position: {
                    x:j,
                    y:i
                },
                label: maze[i][j],
                succ: [] // successing nodes
            }
        }
    }

    // now go through the maze again and determine to nodes that can be reached from every node
    for (let i=0; i<maze.length; i++) {
        for (let j=0; j<maze[i].length; j++) {

            // skip home field
            if (maze[i][j].label === 'h')
                continue;

            let {x,y} = maze[i][j].position;
            let diff = getDirectionForLabel(maze[i][j].label);
            x += diff.x;
            y += diff.y;
            while (x>=0 && y>=0 && x < maze[0].length && y < maze.length) {
                maze[i][j].succ.push(maze[y][x]);
                x += diff.x;
                y += diff.y;
            }

        }
    }
    return maze;
}

const searchGraphRec = (node, currentPath, paths) => {
    if (node.label === "h") {
        paths.push(currentPath);
        return;
    }

    let hasLoop = currentPath.some((step,index) => {
        return node === step && index != currentPath.length-1;
    });
    if (hasLoop) return;

    //console.log(node);
    node.succ.forEach(nextNode => {
        searchGraphRec(nextNode, currentPath.concat(nextNode),paths);
    })

}

const searchArrowPath = (maze, start) => {
    maze = convertMazeToGraph(maze);
    let paths = [];
    let beginning = maze[start.y][start.x];
    searchGraphRec(beginning,[beginning] ,paths);

    console.log("All possible paths:")
    console.log("###################");
    paths.forEach(path => {
        console.log(`Length: ${path.length}`);
        path.forEach(node => {
            console.log(`(${node.position.x},${node.position.y})`);
        })
        console.log("");
    })
    
}


searchArrowPath(parseMaze(input),{x:2,y:0});