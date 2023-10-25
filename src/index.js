const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const apiRoutes = require('./routes/index');
const { PORT } = require('./config/serverConfig');

const userRepository = require('./repository/user-repository')

app.get('/', (req, res) => res.send('Hello World!'))


const prepareAndStartServer = async () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));
    
    app.use('/api', apiRoutes);

    // const repo = new userRepository();
    // const res = await repo.getById(2);
    // console.log(res);

    app.listen(PORT, () => {
        console.log(`Server started ${PORT}`);
    })
}

prepareAndStartServer();