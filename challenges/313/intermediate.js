// https://www.reddit.com/r/dailyprogrammer/comments/68zsoo/20170503_challenge_313_intermediate_pgm_image/

"use strict";

var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
})

if (process.argv.length <= 2) {
    console.error("You need to pass the operations for the given image.")
    process.exit();
}

let operations = process.argv[2].split("");
let fileLines = [];

rl.on("line", function(line) {
    fileLines.push(line);
})
rl.on("close", function() {
    readFileData(fileLines);
});

const readFileData = (data) => {
    let fileStats = {};
    let stats = data[0].split(" ");
    let image = {
        type: stats[0],
        width: parseInt(stats[1]),
        height: parseInt(stats[2]),
        maxValue: parseInt(stats[3]),
        data: []
    } 
    let index = 1;
    for (let i=0; i<image.height; i++) {
        let line = [];
        for (let j=0; j<image.width; j++) {
            if (image.type == "P2") {
                line.push(parseInt(data[index++]));
            }
            if (image.type == "P3") {
                // colored image => get next 3 data fields for r/g/b
                line.push([parseInt(data[index++]),parseInt(data[index++]),parseInt(data[index++])]);
            }
        }
        image.data.push(line);
    }

    writeFileData(processImageManipulation(image));
}

const processImageManipulation = (image) => {
    operations = minimizeOperations(operations); 
    for (let i=0; i<operations.length; i++) {
        switch(operations[i]) {
            case "H":
                image = flipHorizontally(image); break;
            case "V":
                image = flipVertically(image); break;
            case "R":
                image = rotateRight(image); break;
            case "L":
                image = rotateLeft(image); break;
            case "E":
                image = enlarge(image); break;
            case "S":
                image = shrink(image); break;
            case "N":
                image = negative(image); break;
            case "B":
                image = brighten(image); break;
            case "D":
                image = darken(image); break;
            case "C":
                image = increaseContrast(image); break;
            case "W":
                image = decreaseContrast(image); break;
        }
    }

    return image;
}

const outputPixel = (pixel, image) => {
    let out = "";
    if (image.type == "P2") {
        out += Math.max(0,Math.min(image.maxValue,parseInt(pixel)));
    }
    if (image.type == "P3") {
        out += Math.max(0,Math.min(image.maxValue,parseInt(pixel[0]))) + "\n";
        out += Math.max(0,Math.min(image.maxValue,parseInt(pixel[1]))) + "\n";
        out += Math.max(0,Math.min(image.maxValue,parseInt(pixel[2])));
    }
    return out;
}

const writeFileData = (image) => {
    console.log(`${image.type} ${image.width} ${image.height} ${image.maxValue}`);
    image.data.forEach(line => {
        line.forEach(pixel => {
            console.log(outputPixel(pixel,image));
        })
    })
}

// ############################# Standard Operations ##########################

const rotateRight = (image) => {
    // create new matrix with fresh, empty arrays
    let newData = [];
    for (let i=0; i<image.width; i++) {
        newData.push([]);
    }

    // rotate right
    image.data.forEach(line => {
        line.forEach((pixel, index) => {
            newData[index].unshift(pixel);
        })
    })

    // replace the old image matrix with the new one
    image.data = newData;

    // swap height and width
    image.height = [image.width, image.width=image.height][0];
    return image;
}

const rotateLeft = (image) => {
    // create new matrix with fresh, empty arrays
    let newData = [];
    for (let i=0; i<image.width; i++) {
        newData.push([]);
    }

    // rotate left
    image.data.forEach(line => {
        line = line.reverse();
        line.forEach((pixel, index) => {
            newData[index].push(pixel);
        })
    })

    // replace the old image matrix with the new one
    image.data = newData;

    // swap height and width
    image.height = [image.width, image.width=image.height][0];
    return image;
}

const flipVertically = (image) => {
    image.data = image.data.reverse();
    return image;
}

const flipHorizontally = (image) => {
    image.data.map(line => {
        return line.reverse();
    })
    return image;
}

// ############################# Bonus 1 ##########################

const minimizeOperations = (ops) => {
    // TODO implement
    return ops;
}

// ############################# Bonus 2 ##########################

// simplest enlarging method => get nearest neighboor with lower index
const enlarge = (image) => {
    image.height *= 2;
    image.width *= 2;
    let newData = [];
    for (let i=0; i<image.height; i++) {
        let row = [];
        for (let j=0; j<image.width; j++) {
            row.push(image.data[Math.floor(i/2)][Math.floor(j/2)]);
        }
        newData.push(row);
    }
    image.data = newData;
    return image;
}

const shrink = (image) => {
    image.height /= 2;
    image.width /= 2;
    let newData = [];
    for (let i=0; i<image.height; i++) {
        let row = [];
        for (let j=0; j<image.width; j++) {
            row.push(image.data[i*2][j*2]);
        }
        newData.push(row);
    }
    image.data = newData;
    return image;
}

const negative = (image) => {
    image.data = image.data.map(line => {
        return line.map(pixel => {
            if (image.type == "P2")
                return image.maxValue-pixel;
            if (image.type == "P3") {
                return [image.maxValue-pixel[0]
                    ,image.maxValue-pixel[1]
                    ,image.maxValue-pixel[2]];
            }

        })
    });
    return image;
}

const changeBrightness = (image, value) => {
    image.data = image.data.map(line => {
        return line.map(pixel => {
            if (image.type == "P2")
                return pixel+value;
            if (image.type == "P3")
                return [pixel[0]+value
                    ,pixel[1]+value
                    ,pixel[2]+value];
        })
    })
    return image;
}

const brighten = (image) => {
    return changeBrightness(image,image.maxValue * 0.1);
}

const darken = (image) => {
    return changeBrightness(image,image.maxValue * 0.1 * -1);
}

const changeContrast = (image, direction=1) => {
    let middle = image.maxValue/2;
    let factor = (direction == 1 ? 1.5 : 0.5);
    image.data = image.data.map(line => {
        return line.map(pixel => {
            if (image.type == "P2")
                return ((pixel-middle)*factor)+middle;
            if (image.type == "P3")
                return [((pixel[0]-middle)*factor)+middle
                    ,((pixel[1]-middle)*factor)+middle
                    ,((pixel[2]-middle)*factor)+middle];
        })
    })
    return image;
}

const increaseContrast = (image) => {
    return changeContrast(image);
}

const decreaseContrast = (image) => {
    return changeContrast(image,-1);
}

// ############################# Bonus 3 ##########################

// has been implemented alongside the other bonuses and basic implementations
