// https://www.reddit.com/r/dailyprogrammer/comments/6y19v2/20170904_challenge_330_easy_surround_the_circles/

"use strict";

const surroundTheCircles = (circles,orientation = [1,0]) => {

    let angle = Math.atan(orientation[1]/orientation[0]);

    circles = circles.map(circle => rotate2d(circle,-angle));

    let xMin = Number.MAX_VALUE, xMax = Number.MIN_VALUE;
    let yMin = Number.MAX_VALUE, yMax = Number.MIN_VALUE;

    circles.forEach(circle => {
        xMin = Math.min(xMin, circle.x-circle.radius);
        xMax = Math.max(xMax, circle.x+circle.radius);
        yMin = Math.min(yMin, circle.y-circle.radius);
        yMax = Math.max(yMax, circle.y+circle.radius);
    })  

    let rect = [
        {x: xMin, y: yMin},
        {x: xMin, y: yMax},
        {x: xMax, y: yMax},
        {x: xMax, y: yMin}
    ]

    rect = rect.map(point => rotate2d(point,angle));
    
    return rect;
}

const rotate2d = (point, angle) => {
    let x = point.x, y = point.y;

    point.x = Math.cos(angle) * x - Math.sin(angle) * y;
    point.y = Math.sin(angle) * x + Math.cos(angle) * y;

    return point;
}

const parseInput = (lines) => {
    lines = lines.split("\n");
    
    let vector;
    if (lines[0].split(",").length == 2) {
        vector = lines.shift().split(",").map(value => parseFloat(value));
    }

    lines = lines.map(line => {
        line = line.split(",");
        return {
            x: parseFloat(line[0]),
            y: parseFloat(line[1]),
            radius: parseFloat(line[2])
        };
    })

    return [lines,vector];
}

console.log(surroundTheCircles(...parseInput(`1,1,2
2,2,0.5
-1,-3,2
5,2,1`)));

console.log(surroundTheCircles(...parseInput(`1,1
1,1,2
2,2,0.5
-1,-3,2
5,2,1`)));

