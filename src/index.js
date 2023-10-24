const express = require('express')
const app = express();

const { PORT } = require('./config/serverConfig');

app.get('/', (req, res) => res.send('Hello World!'))


const prepareAndStartServer = () => {

    app.listen(PORT, () => {
        console.log(`Server started ${PORT}`);
    })
}

prepareAndStartServer();