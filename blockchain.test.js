const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {
    let blockchain;

    beforeEach(() => {
        blockchain = new Blockchain();        
    })

    it('contains a `chain` Array instance', () => {
        expect(blockchain.chain instanceof Array).toBe(true);
    });

    it('starts with the genesis block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new block to the chain', () => {
        const newData = "test data";
        blockchain.addBlock({ data: newData });
        expect(blockchain.chain[blockchain.chain.length-1].data)
            .toEqual(newData);
    });

    describe('isValidChain()', () => {
        describe('when the chain does not start with genesis block', () => {
            it('returns false', () => {
                blockchain.chain[0] = { data: ['tempered-data'] };
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
            });
        });

        describe('when the chain starts with genesis block and has multiple blocks', () => {
            beforeEach(() => {
                blockchain.addBlock({ data: 'Cat' });
                blockchain.addBlock({ data: 'Dog' });
                blockchain.addBlock({ data: 'Bird' }); 
            });

            describe('and a lastHash reference has changed', () => {
                it('returns false', () => {
                    blockchain.chain[2].lastHash = 'wrong-lastHash';
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });

            describe('and the chain contains a block with an invalid field', () => {
                it('returns false', () => {
                    blockchain.chain[2].lastHash = 'tempered-data';
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);                    
                });
            });

            describe('and the chain does not contain any invalid blocks', () => {
                it('returns true', () => {
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);                    
                });
            });            
        });        
    })
})