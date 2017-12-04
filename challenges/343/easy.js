// https://www.reddit.com/r/dailyprogrammer/comments/7hhyin/20171204_challenge_343_easy_major_scales/

"use strict";

let notes = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
let steps = {"Do":0,"Re":2,"Mi":4,"Fa":5,"So":7,"La":9,"Ti":11};

let note = (major,solfege) => {
    let index = notes.indexOf(major);
    let offset = steps[solfege];
    let newIndex = (index+offset)%notes.length;
    return notes[newIndex];
}

console.log(note("C", "Do"));
console.log(note("C", "Re"));
console.log(note("C", "Mi"));
console.log(note("D", "Mi"));
console.log(note("A#", "Fa"));
