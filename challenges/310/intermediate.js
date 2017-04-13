// https://www.reddit.com/r/dailyprogrammer/comments/64y4cf/20170412_challenge_310_intermediate_simplifying/

"use strict";

const gcd = (a,b) => {
    if (!b) return a;

    return gcd(b,a%b);
}

// after first attempt which didn't deliver a general solution, here's the implementation of
// https://www.reddit.com/r/dailyprogrammer/comments/64y4cf/20170412_challenge_310_intermediate_simplifying/dg6b5xf/?utm_content=permalink&utm_medium=front&utm_source=reddit&utm_name=dailyprogrammer
const simplifySquareRoots = (a,b,c,d) => {

    // multiply nominator and denominator with sqrt(d)
    b *= d;
    c *= d;

    // extract square factors from b
    let sq;
    for (let i=2; (sq=i*i) <= b ; i++) {
        while (b % sq == 0) {
            b /= sq;
            a *= i;
        }
    }

    let g = gcd(a,c);
    a /= g;
    c /= g;

    return {a,b,c};
}

console.log(simplifySquareRoots(2,5,5,10));
console.log(simplifySquareRoots(45,1465,26,15));