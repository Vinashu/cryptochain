const express = require('express');
const BlockChain = require('./blockchain');

const app = express();
const blockchain = new BlockChain();

app.get('/api/blocks', (req, res) => {
   res.json(blockchain.chain);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`listening at localhost:${PORT}`);
});