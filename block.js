const hexToBinary = require('hex-to-binary');
const { MINE_RATE, GENESIS_DATA } = require('./config');
const cryptoHash = require('./crypto-hash');

class Block {
    constructor({ timestamp, lastHash, hash, data, nonce, difficulty }) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    toString() {
        return `Block -
            Timestamp : ${this.timestamp}
            LastHash  : ${this.lastHash}
            Hash      : ${this.hash}
            Nonce     : ${this.nonce}
            Difficulty: ${this.difficulty}
            Data      : ${this.data}`;
    }

    static genesis() {
        return new this(GENESIS_DATA);
    }

    static mineBlock({ lastBlock, data }) {
        const lastHash = lastBlock.hash;
        let hash, timestamp;
        let nonce = 0;
        let { difficulty } = lastBlock;

        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.ajustDifficulty({ originalBlock: lastBlock, timestamp });
            hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
        } while (hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this({
            timestamp,
            lastHash,
            data,
            difficulty,
            nonce,
            hash 
        });
    }

    static ajustDifficulty({ originalBlock, timestamp }) {
        const { difficulty } = originalBlock;
        const difference = timestamp - originalBlock.timestamp;

        if(difficulty < 0) {
            return 1;
        }

        if(difference > MINE_RATE) {
            return difficulty - 1;
        } else {
            return difficulty + 1;
        }
    }

}

module.exports = Block;