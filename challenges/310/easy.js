// https://www.reddit.com/r/dailyprogrammer/comments/64jesw/20170410_challenge_310_easy_kids_lotto/

"use strict";

const generateLottoLists = (kids,count) => {
    // convert string to array of kid names
    kids = kids.split(";");

    // prevent '0' and 'length-1' as step to not get to the same kid when increasing the index
    let randomStep = Math.floor(Math.random(0)*(kids.length-1))+1;

    let lists = [];
    kids.forEach(function(kid,index) {
        let classmates = [];
        let newIndex = index;
        for (let i=0; i<count; i++) {
            // increase index by randomStep with wrap around
            newIndex = (newIndex+randomStep)%kids.length;
            classmates.push(kids[newIndex]);
        }

        lists.push({
            kidName: kid,
            kids: classmates
        })
    });
    return lists;
}

const printLottoList = (lists) => {
    lists.forEach((list) => {
        console.log(`${list.kidName} > ${list.kids.join(";")}`)
    })
}

printLottoList(generateLottoLists("Rebbeca Gann;Latosha Caraveo;Jim Bench;Carmelina Biles;Oda Wilhite;Arletha Eason",3));
console.log();
printLottoList(generateLottoLists("Rebbeca Gann;Latosha Caraveo;Jim Bench;Carmelina Biles;Oda Wilhite;Arletha Eason;Theresa Kaczorowski;Jane Cover;Melissa Wise;Jaime Plascencia;Sacha Pontes;Tarah Mccubbin;Pei Rall;Dixie Rosenblatt;Rosana Tavera;Ethyl Kingsley;Lesia Westray;Vina Goodpasture;Drema Radke;Grace Merritt;Lashay Mendenhall;Magali Samms;Tiffaney Thiry;Rikki Buckelew;Iris Tait;Janette Huskins;Donovan Tabor;Jeremy Montilla;Sena Sapien;Jennell Stiefel",15));