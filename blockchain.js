const Block = require('./block');

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock({ data }) {
        const lastBlock = this.getLastBlock();
        const newBlock = Block.mineBlock({
            lastBlock,
            data
        });
        this.chain.push(newBlock);
    }

    getLastBlock() {
        return this.chain[this.chain.length-1];
    }
}

module.exports = Blockchain;