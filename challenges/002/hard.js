// https://www.reddit.com/r/dailyprogrammer/comments/pjsdx/difficult_challenge_2/

"use strict"

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


let times = [];
let timer;
let offset = 0;

const STATES = {
    "IDLE": "Idle",
    "RECORDING": "Recording",
    "STOPPED": "Stopped"
}
let currentState = STATES.IDLE;

const showMainMenu = () => {
    clearTerminal();
    rl.write(`Welcome to this little stopwatch-program. Available commands: 
    'start'/'stop'/'s'  - start, stop or resume the stopwatch (depending on the current state)
    'lap'/'l'           - record a lap (if stopwatch is running)
    'reset'/'r'         - reset all recorded data (if stopwatch has been stopped)
    'write'/'w'         - write recorded data to a file (if stopwatch has been stopped)
    'quit'/'q'          - exit the program at any given moment\n`);
};

const showRecordingScreen = () => {
    clearTerminal();

    rl.write(convertTimesToString());

    rl.write("\n");

    if (currentState === STATES.RECORDING)
        rl.write(`Stopwatch is running. 's' for stop, 'l' for lap.\n`)
    if (currentState === STATES.STOPPED)
        rl.write(`Stopwatch has been stopped. 's' for resume, 'r' for reset and 'w' to write data to file.\n`);


    rl.write("Command: \n");
}

const convertTimesToString = () => {
    let str = "";
    str += "Recorded times:\n";
    times.forEach((lap,index) => {
       str += `${index+1} - ${formatTime(lap)}\n`;
    })
    return str;
}

const formatTime = (time) => {
    let min = Math.floor(time / 60000);
    let sec = Math.floor((time-min*60000)/1000);
    let msec = Math.floor(time - min*60000 - sec*1000);
    return `${min}:${sec}.${msec}`;
}

const start = () => {
    timer = new Date();
    currentState = STATES.RECORDING;
    showRecordingScreen();
}

const lap = () => {
    times.push(Math.abs(new Date() - timer) + offset);
    showRecordingScreen();
}

const stop = () => {
    times.push(Math.abs(new Date() - timer) + offset);
    currentState = STATES.STOPPED;
    offset = times[times.length-1];
    showRecordingScreen();
}

const showWriteMenu = () => {
    clearTerminal();
    rl.question("Enter the name if the output-file:", fileName => {
        fs.writeFile(path.join(__dirname,fileName+".txt"),convertTimesToString(),(err) => {
            if (err) throw err;

            rl.question("Data successfully written to file. Press enter to continue ...",()=>{
                showRecordingScreen();
            })
        });
    })
}

const reset = () => {
    times = [];
    offset = 0;
    currentState = STATES.IDLE;
    showMainMenu();
}

rl.on("line", command => {
    switch(command) {
        case 'start':
        case 'stop':
        case 's':
            if (currentState === STATES.IDLE || currentState === STATES.STOPPED) {
                start();
                return;
            }

            if (currentState === STATES.RECORDING) {
                stop();
                return;
            }
            break;
        case 'lap':
        case 'l':
            if (currentState === STATES.RECORDING)
                lap();
            break;
        case 'reset':
            if (currentState === STATES.STOPPED)
                reset();
        case 'r':
            break;
        case 'write':
        case 'w':
            if (currentState === STATES.STOPPED)
                showWriteMenu();
            break;
        case 'quit':
        case 'q':
            rl.close();
    }
});

const clearTerminal = () => {
    rl.write(null, {ctrl: true, name:"l"});
}

showMainMenu();
