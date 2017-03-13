// https://www.reddit.com/r/dailyprogrammer/comments/pihtx/intermediate_challenge_1/

"use strict"

const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

let events = [];
let lastIndex = 0;

const clearTerminal = () => {
    //rl.write('\x1Bc');
    rl.write(null, {ctrl: true, name:"l"});
}

const chooseMainCommand = () => {
    rl.write(`Available commands:
    a - Add a new event
    d - Delete an existing event
    e - Edit an existing event
    q - Quit the program\n`);

    rl.question("Which command do you choose? - ", (command) => {
        switch (command) {
            case "a":
                showAddMenu();
                break;
            case "d":
                showDeleteMenu();
                break;
            case "e":
                showEditMenu();
                break;
            case "q":
                rl.close();
                break;
            default:
                rl.write("Unknown command. Please select another.\n");
                chooseMainCommand();
                break;
        }
    })
}

const validEventFormat = (eventString) => {
    let data = eventString.split(" ");
    if (isNaN(data[1]) || parseInt(data[1] < 0 || parseInt(data[1] > 23)))
        return false;

    if (isNaN(data[2]) || parseInt(data[2] < 0 || parseInt(data[2] > 59)))
        return false;

    return true;
}

const sortEvents = () => {
    events.sort((a,b) => {
        return (a.hour*60+b.minute)-(b.hour*60+b.minute);
    })
}

const showEditMenu = () => {
    clearTerminal();
    rl.question("What event do you want to edit? Give me its id - ", id => {
        let found = events.some(element => {
            return element.id == id;
        })

        if (!found) {
            rl.question("The given id couldn't be found. Returning to the main menu.",() => {
                showMainMenu();
            })
        }

        rl.question("Please enter the edited data for the event (format: 'name hour minute')! - ", event => {
            if (validEventFormat(event)) {
                let data = event.split(" ");
                events = events.map(element => {
                    if (element.id == id) {
                        return {
                            id: id,
                            title: data[0],
                            hour: parseInt(data[1]),
                            minute: parseInt(data[2])
                        }
                    } else {
                        return element;
                    }
                });
                sortEvents();
                showMainMenu();
            } else {
                rl.question("Invalid format. Returning to main menu.",() => {
                    showMainMenu();
                })
            }
        });
    })
}

const showDeleteMenu = () => {
    clearTerminal();
    rl.question("What event do you want to be deleted? Give me its id - ", id => {
        events = events.filter(element => {
            return element.id != id;
        });
        showMainMenu();
    });
}

const showAddMenu = () => {
    clearTerminal();
    rl.question("What event do you want to add (format: 'name hour minute')? - ", event => {
        if (validEventFormat(event)) {
            let data = event.split(" ");
            events.push({
                id: lastIndex++,
                title: data[0],
                hour: parseInt(data[1]),
                minute: parseInt(data[2])
            });
            sortEvents();
            showMainMenu();
        } else {
            rl.question("Invalid format. Returning to main menu.",() => {
                showMainMenu();
            })
        }
    });
}

const showMainMenu = () => {
    clearTerminal();
    rl.write("Welcome to this simple and small event organizer.\n");

    rl.write(`
List of existing events
#######################
`);
    if (events.length == 0) {
        rl.write("There are currently no events available.\n")
    } else {
        events.forEach(event => {
            rl.write(event.id + " - " + event.hour + ":" + event.minute + ' "' + event.title + '"\n');
        })
    }
    rl.write("\n");

    chooseMainCommand();
}


showMainMenu();