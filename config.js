const MINE_RATE = 1000;
const INTIAL_DIFFICULTY = 3;

const GENESIS_DATA = {
    'timestamp' : '00000000',
    'lastHash' : '00000000',
    'hash' : '00000000',
    'difficulty': INTIAL_DIFFICULTY,
    'nonce': 0,
    'data' : []    
}

module.exports = { MINE_RATE, GENESIS_DATA };