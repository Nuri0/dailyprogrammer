// https://www.reddit.com/r/dailyprogrammer/comments/784fgr/20171023_challenge_337_easy_minimize_maximize/

"use strict";

const sectorArea = (angle) => {
    let r = 100 / (2 + Math.PI * angle / 180);
    return (angle / 360) * Math.PI * r * r;
}

const pipeLength = (a) => {
    return Math.sqrt(a*a + 400) + Math.sqrt(10900 - 200 * a + a*a);
}

// https://gist.github.com/TragicSolitude/796f2a1725e9abf13638
const derivative = (f) => {
    let e = 1e-5;
    return (x) => { return (f(x+e) - f(x-e)) / (2 * e) };
}

const newton = (f,x0) => {
    let d1 = derivative(f);
    let d2 = derivative(d1);
    let x1 = x0 - (d1(x0) / d2(x0));
    while (Math.abs(x1-x0) > 1e-5) {
        x0 = x1;
        x1 = x0 - (d1(x0) / d2(x0));
    }

    return x1;
}

console.log(newton(sectorArea,1));
console.log(newton(pipeLength,1));