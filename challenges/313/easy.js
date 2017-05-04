// https://www.reddit.com/r/dailyprogrammer/comments/68oda5/20170501_challenge_313_easy_subset_sum/

"use strict";

const easySubsetSum = (arr) => {
    for (let i=0; i<arr.length; i++) {
        if (arr[i] == 0) return true;
        for (let j=i+1; j<arr.length; j++) {
            if (arr[i] + arr[j] == 0) return true;
        }
    }

    return false;
}

// var twosum=a=>Boolean(a.filter(n=>a.includes(-n)).length)
// var twosum=a=>a.some(n=>a.includes(-n))
// https://www.reddit.com/r/dailyprogrammer/comments/68oda5/20170501_challenge_313_easy_subset_sum/dh00a48/

// as the number of variables is relatively small, an exhaustive search through all possibilities is a more practical solution than dynamic programming
const subsetSumRec = (arr,index,b,picked) => {
    if (index == arr.length) return b===0 && picked;

    return subsetSumRec(arr,index+1,b-arr[index],true) || subsetSumRec(arr,index+1,b,picked);
}

let set01 = [1, 2, 3];
let set02 = [-5, -3, -1, 2, 4, 6];
let set03 = [];
let set04 = [-1, 1];
let set05 = [-97364, -71561, -69336, 19675, 71561, 97863];
let set06 = [-53974, -39140, -36561, -23935, -15680, 0];

console.log(`[${set01}] -> ${easySubsetSum(set01)}`);
console.log(`[${set02}] -> ${easySubsetSum(set02)}`);
console.log(`[${set03}] -> ${easySubsetSum(set03)}`);
console.log(`[${set04}] -> ${easySubsetSum(set04)}`);
console.log(`[${set05}] -> ${easySubsetSum(set05)}`);
console.log(`[${set06}] -> ${easySubsetSum(set06)}`);

let set07 = [-83314, -82838, -80120, -63468, -62478, -59378, -56958, -50061, -34791, -32264, -21928, -14988, 23767, 24417, 26403, 26511, 36399, 78055];
let set08 = [-92953, -91613, -89733, -50673, -16067, -9172, 8852, 30883, 46690, 46968, 56772, 58703, 59150, 78476, 84413, 90106, 94777, 95148];
let set09 = [-94624, -86776, -85833, -80822, -71902, -54562, -38638, -26483, -20207, -1290, 12414, 12627, 19509, 30894, 32505, 46825, 50321, 69294];
let set10 = [-83964, -81834, -78386, -70497, -69357, -61867, -49127, -47916, -38361, -35772, -29803, -15343, 6918, 19662, 44614, 66049, 93789, 95405];
let set11 = [-68808, -58968, -45958, -36013, -32810, -28726, -13488, 3986, 26342, 29245, 30686, 47966, 58352, 68610, 74533, 77939, 80520, 87195];

console.log("\nChallenge outputs that are supposed to be false:")

console.log(subsetSumRec(set07,0,0,false));
console.log(subsetSumRec(set08,0,0,false));
console.log(subsetSumRec(set09,0,0,false));
console.log(subsetSumRec(set10,0,0,false));
console.log(subsetSumRec(set11,0,0,false));

let set12 = [-97162, -95761, -94672, -87254, -57207, -22163, -20207, -1753, 11646, 13652, 14572, 30580, 52502, 64282, 74896, 83730, 89889, 92200]
let set13 = [-93976, -93807, -64604, -59939, -44394, -36454, -34635, -16483, 267, 3245, 8031, 10622, 44815, 46829, 61689, 65756, 69220, 70121]
let set14 = [-92474, -61685, -55348, -42019, -35902, -7815, -5579, 4490, 14778, 19399, 34202, 46624, 55800, 57719, 60260, 71511, 75665, 82754]
let set15 = [-85029, -84549, -82646, -80493, -73373, -57478, -56711, -42456, -38923, -29277, -3685, -3164, 26863, 29890, 37187, 46607, 69300, 84808]
let set16 = [-87565, -71009, -49312, -47554, -27197, 905, 2839, 8657, 14622, 32217, 35567, 38470, 46885, 59236, 64704, 82944, 86902, 90487]

console.log("\nChallenge outputs that are supposed to be true:")

console.log(subsetSumRec(set12,0,0,false));
console.log(subsetSumRec(set13,0,0,false));
console.log(subsetSumRec(set14,0,0,false));
console.log(subsetSumRec(set15,0,0,false));
console.log(subsetSumRec(set16,0,0,false));
