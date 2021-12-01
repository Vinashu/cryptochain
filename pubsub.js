const PubNub = require('pubnub');

const credentials = {
    publishKey: 'pub-c-305503dd-efd1-4089-ab27-7a46f12c5992',
    subscribeKey: 'sub-c-16705b14-526f-11ec-8b9e-da88ab2aee1c',
    secretKey: 'sec-c-MTUyMDMwMmUtYmYzZS00YzM3LWE4YmMtMzEwNWMzZjkyOWIz'
};

const CHANNELS = {
    TEST: 'TEST',
    BLOCKCHAIN: 'BLOCKCHAIN'
};

class PubSub {
    constructor({ blockchain }) {
        this.blockchain = blockchain;

        this.pubnub = new PubNub(credentials);
        this.pubnub.subscribe({ channels: Object.values(CHANNELS) });
        this.pubnub.addListener(this.listener());
    }

    listener() {
        return {
            message: (messageObject) => {
                const { channel, message } = messageObject;
                console.log(`Message received. Channel: ${channel}. Message: ${message}`);
                this.handleMessage(channel, message);
            }
        };
    }

    handleMessage(channel, message) {
        const parsedMessage = JSON.parse(message);

        if(channel === CHANNELS.BLOCKCHAIN) {
            this.blockchain.replaceChain(parsedMessage);
        }
    }

    publish({ channel, message }) {
        this.pubnub.publish({ channel, message });
    }

    broadcastChain() {
        this.publish({
            channel: CHANNELS.BLOCKCHAIN,
            message: JSON.stringify(this.blockchain.chain)
        });
    }
}

// const testPubSub = new PubSub();
// testPubSub.publish({ channel: CHANNELS.TEST, message: "test message" });

module.exports = PubSub;


// const redis = require('redis');

// const CHANNELS = {
//     TEST: 'TEST'
// }

// class PubSub {
//     constructor() {
//         this.publisher = redis.createClient();
//         this.subscriber = redis.createClient();

//         this.subscriber.subscribe(CHANNELS.TEST);
        
//         this.subscriber.on('message', (channel, message) => {
//             this.handleMessage(channel, message);
//         });
//     }

//     handleMessage(channel, message) {
//         console.log(`Message received. Channel: ${channel}. Message: ${message}`);
//     }    
// }

// const testPubSub = new PubSub();

// setTimeout(() => testPubSub.publisher.publish(CHANNELS.TEST, 'test'), 5000);