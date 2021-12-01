const express = require('express');
const bodyParser = require('body-parser');
const BlockChain = require('./blockchain');
const PubSub = require('./pubsub');

const app = express();
const blockchain = new BlockChain();
const pubsub = new PubSub({ blockchain });

setTimeout(() => pubsub.broadcastChain(), 1000);

app.use(bodyParser.json());

app.get('/api/blocks', (req, res) => {
   res.json(blockchain.chain);
});

app.post('/api/mine', (req, res) => {
    const { data } = req.body;
    blockchain.addBlock({ data });
    pubsub.broadcastChain();
    res.redirect('/api/blocks');
});

const DEFAULT_PORT = 3000;
let PEER_PORT;

if(process.env.GENERATE_PEER_PORT === 'true') {
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = PEER_PORT || DEFAULT_PORT;
app.listen(PORT, () => {
    console.log(`listening at localhost:${PORT}`);
});

//https://www.pubnub.com/

//https://medium.com/@petehouston/install-and-config-redis-on-mac-os-x-via-homebrew-eb8df9a4f298

/*
To restart redis after an upgrade:
    brew services restart redis
Or, if you don't want/need a background service you can just run:
    /usr/local/opt/redis/bin/redis-server /usr/local/etc/redis.conf
Test if Redis server is running.
    $ redis-cli ping
*/

//"dev": "npm run start-redis && nodemon index.js",
//"start-redis": "redis-server --daemonize yes"