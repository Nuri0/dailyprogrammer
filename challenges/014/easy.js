// https://www.reddit.com/r/dailyprogrammer/comments/q2v2k/2232012_challenge_14_easy/

"use strict";

const sequenceBlockReverse = (sequence, blockSize) => {
  let result = [];
  for (let i=0; i<sequence.length; i+=blockSize) {
    result = result.concat(sequence.slice(i,i+blockSize).reverse());
  }
  return result;
}

console.log(sequenceBlockReverse([12,24,32,44,55,66],2));
console.log(sequenceBlockReverse([1,2,3,4,5,6,7,8,9],3));