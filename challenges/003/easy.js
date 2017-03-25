// https://www.reddit.com/r/dailyprogrammer/comments/pkw2m/2112012_challenge_3_easy/

"use strict"

const rotate = (str, rot) => {
    let chars = [];

    for (let i=0; i<str.length; i++) {
        let code = str.charCodeAt(i);

        if (code >= 97 && code <= 122) {
            code = ((code - 97 + rot) % 26) + 97;
        }

        if (code >= 65 && code <= 90) {
            code = ((code - 65 + rot) % 26) + 65;
        }

        chars.push(code);
    }

    return String.fromCharCode(...chars);
}

const encrypt = (str,rot) => rotate(str,rot);
const decrypt = (str,rot) => rotate(str,-rot);

console.log(encrypt("Caesar",3));
console.log(decrypt("fdhvdu",3));