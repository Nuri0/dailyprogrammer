// https://www.reddit.com/r/dailyprogrammer/comments/6eerfk/20170531_challenge_317_intermediate_counting/

"use strict";

const addElementToCounting = (elements, element, count) => {
    // for element without a number behind the 'count' would be zero
    count = (count==0)?1:count;

    if (typeof element == "object") {

        Object.keys(element).forEach(el => {
            addElementToCounting(elements,el,element[el]*count);
        })
        
    } else {
        if (elements[element] == undefined) {
            elements[element] = count;
        } else {
            elements[element] += count;
        }
    }

    
    return elements;
}

const printElementCounting = (str,elements) => {
    console.log(str);
    console.log("#################");
    Object.keys(elements).forEach(element => {
        console.log(`${element}: ${elements[element]}`);
    })
    console.log();
}

const countingElements = (str) => {
    let elements = {};
    let element = "";
    let count = 0;
    let index = 0;

    while (index < str.length) {
        let cur = str[index];

        if (/[A-Z]/.test(cur)) {
            // big letter
            if (element == "") {
                element = cur;
            } else {
                addElementToCounting(elements,element,count);
                element = cur;
                count = 0;
            }
            index++;
        }

        if (/[a-z]/.test(cur)) {
            // small letter
            element += cur;
            index++;
        }

        if (!isNaN(parseInt(cur))) {
            // we got a number
            count = (count*10) + parseInt(cur);
            index++;
        }

        if (cur == '(') {
            addElementToCounting(elements,element,count);
            let right = str.indexOf(")",index);
            element = countingElements(str.substring(index+1,right));
            count = 0;
            index = right+1;
        }
    }

    addElementToCounting(elements,element,count);

    return elements;
}

printElementCounting("C6H12O6",countingElements("C6H12O6"));
printElementCounting("CCl2F2",countingElements("CCl2F2"));
printElementCounting("NaHCO3",countingElements("NaHCO3"));
printElementCounting("C4H8(OH)2",countingElements("C4H8(OH)2"));
printElementCounting("PbCl(NH3)2(COOH)2",countingElements("PbCl(NH3)2(COOH)2"));
