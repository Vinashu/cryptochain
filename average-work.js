const { tsMethodSignature } = require('@babel/types');
const Blockchain = require('./blockchain');
const blockchain = new Blockchain();
blockchain.addBlock({ data: 'initial' });

console.log('first block', blockchain.getLastBlock());

let prevTimestamp, nextTimestamp, timeDiff, average;
const times = [];
const tests = 10000;

for(let i=0; i<tests; i++) {
    prevTimestamp = blockchain.getLastBlock().timestamp;
    blockchain.addBlock({ data: `block ${i}` });
    nextTimestamp = blockchain.getLastBlock().timestamp;
    timeDiff = nextTimestamp - prevTimestamp;
    times.push(timeDiff);
    average = times.reduce((total, num) => (total + num)) / times.length;
    console.log(`Time to mine block: ${timeDiff}ms. Difficulty: ${blockchain.getLastBlock().difficulty}. Averfage time: ${average}MS`);
}

