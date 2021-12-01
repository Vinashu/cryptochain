const cryptoHash = require('./crypto-hash');
const hexToBinary = require('hex-to-binary');
const Block = require('./block');
const { MINE_RATE, GENESIS_DATA } = require('./config');

describe('Block', () => {
    const timestamp = 1000;
    const lastHash = 'lastHash';
    const hash = 'hash';
    const data = ['data1', 'data2']; 
    const nonce = 1;
    difficulty = 1;
    const block = new Block({
        timestamp,
        lastHash,
        hash,
        data,
        nonce,
        difficulty
    });

    it('has a timestamp, lastHash, hash, and data property', () => {
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
        expect(block.nonce).toEqual(nonce);
        expect(block.difficulty).toEqual(difficulty);
    });

    describe('genesis()', () => {
        const genesisBlock = Block.genesis();

        it('returns a Block instance', () => {
            expect(genesisBlock instanceof Block).toBe(true);
        })

        it('returns the genesis data', () => {
            expect(genesisBlock).toEqual(GENESIS_DATA);
        })
    });

    describe('mineBlock()', () => {
        const lastBlock = Block.genesis();
        const data = ['data1', 'data2'];
        const mineBlock = Block.mineBlock({ lastBlock, data });

        it('returns a Block instance', () => {
            expect(mineBlock instanceof Block).toBe(true);            
        });

        it('sets the `lastHash` to be the `hash` of the lastBlock', () => {
            expect(mineBlock.lastHash).toEqual(lastBlock.hash);
        });

        it('sets the `data`', () => {
            expect(mineBlock.data).toEqual(data);
        });

        it('sets a `timestamp`', () => {
            expect(mineBlock.timestamp).not.toEqual(undefined);
        });

        it('sets a `hash` that matches the difficulty criteria', () => {
            expect(hexToBinary(mineBlock.hash).substring(0, mineBlock.difficulty))
                .toEqual('0'.repeat(mineBlock.difficulty));
        });

        it('creates a SHA-256 `hash` on the proper inputs', () => {
            expect(mineBlock.hash)
                .toEqual(
                    cryptoHash(
                        mineBlock.timestamp,
                        mineBlock.nonce,
                        mineBlock.difficulty,
                        lastBlock.hash,
                        data
                    )
                );
        });

        it('ajusts the difficulty', () => {
            const possibleResults = [lastBlock.difficulty+1, lastBlock.difficulty-1];

            expect(possibleResults.includes(mineBlock.difficulty)).toBe(true);
        });
    });

    describe('ajustDifficulty()', () => {
        it('raises the difficulty for a quickly mined block', () => {
            expect(Block.ajustDifficulty({ 
                originalBlock: block, 
                timestamp: block.timestamp + MINE_RATE - 100
            })).toEqual(block.difficulty + 1);
        });

        it('lowers the difficulty for a slowly mined block', () => {
            expect(Block.ajustDifficulty({ 
                originalBlock: block, 
                timestamp: block.timestamp + MINE_RATE + 100
            })).toEqual(block.difficulty - 1);
        });     
        
        it('has a lower limit of 1', () => {
            block.difficulty = -1;

            expect(Block.ajustDifficulty({ originalBlock: block})).toEqual(1);
        });
    });
});