const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const apiRoutes = require('./routes/index');
const { PORT } = require('./config/serverConfig');

app.get('/', (req, res) => res.send('Hello World!'))


const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));
    
    app.use('/api', apiRoutes);

    app.listen(PORT, () => {
        console.log(`Server started ${PORT}`);
    })
}

prepareAndStartServer();