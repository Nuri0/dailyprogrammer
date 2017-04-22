// https://www.reddit.com/r/dailyprogrammer/comments/669u44/20170419_challenge_311_intermediate_ipv4_subnet/

"use strict";

const pad8 = (binary) => {
    let str = binary;
    while (str.length < 8) str = '0' + str;
    return str;
}

const decimalIpToBinary = (ip) => {
    return ip.split(".").map(o => {
        return pad8(parseInt(o).toString(2));
    }).join("");
}

const updateCovering = (covering, adress) => {
    // "compareIp"
    let [compIp,compLen] = adress.split("/");
    compIp = decimalIpToBinary(compIp);

    for (let i=0; i<covering.length; i++) {
        // "coveringIp"
        let [covIp, covLen] = covering[i].split("/")
        covIp = decimalIpToBinary(covIp);

        if (compLen < covLen) {
            // new adress might replace the existing one

            // if the network part of the new adress is the same as the prefix of the existing adress ...
            if (covIp.startsWith(compIp.substr(0,compLen))) {
                // we can delete the existing with the new
                covering.splice(i,1);
            }
        } else {
            
            // new adress might fall under the covering of the existing adress

            if (compIp.startsWith(covIp.substr(0,covLen))) {
                // new adress is already covered
                return;
            }
        }

    }

    covering.push(adress);
}

const computeMinimalNetworkConvering = (adresses) => {
    let covering = [];

    adresses.forEach(function(adress) {
        updateCovering(covering,adress);

    });

    return covering;
}

let adresses1 = `172.26.32.162/32
172.26.32.0/24
172.26.0.0/16`.split("\n")

let adresses2 = `192.168.0.0/16
172.24.96.17/32
172.50.137.225/32
202.139.219.192/32
172.24.68.0/24
192.183.125.71/32
201.45.111.138/32
192.168.59.211/32
192.168.26.13/32
172.24.0.0/17
172.24.5.1/32
172.24.68.37/32
172.24.168.32/32`.split("\n")

console.log("Output for normal input");
console.log(computeMinimalNetworkConvering(adresses1).join("\n"));
console.log("");
console.log("Output for challenge input");
console.log(computeMinimalNetworkConvering(adresses2).join("\n"));