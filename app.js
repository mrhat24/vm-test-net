const axios = require('axios');
const dotenv = require('dotenv');
const express = require('express');

dotenv.config({ path: '.env' });

const remoteUrl = process.env.APP_REMOTE_URL;
const port = process.env.APP_PORT;
const appResponse = process.env.APP_RESPONSE;

const app = new express();

app.get('/', (req, res) => {
    res.send(appResponse)
});

app.listen(port, () => {
    console.log(`listening port: `, port);
});

const sleep = (ms) => {
    return new Promise(res => {
        setTimeout(() => {
            res();
        }, ms);
    })
};

(async () => {
    while (true) {
        try {
            await sleep(2000);
            const response = await axios.get(remoteUrl);
            console.log(response?.status);
            console.log(response?.data);
        } catch (e) {
            console.log(e);
        }
    }
})();
