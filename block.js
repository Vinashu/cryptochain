const { GENESIS_DATA } = require("./config");

class Block {
    constructor({timestamp, lastHash, hash, data}) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    static genesis() {
        return new this(GENESIS_DATA);
    }

    // toString() {
    //     return `Block -
    //         Timestamp: ${this.timestamp}
    //         LastHash : ${this.lastHash}
    //         Hash     : ${this.hash}
    //         Data     : ${this.data}`;
    // }
}

module.exports = Block;