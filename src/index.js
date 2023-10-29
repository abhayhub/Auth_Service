const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const apiRoutes = require('./routes/index');
const { PORT } = require('./config/serverConfig');
const db = require('./models/index');
const UserService = require('./services/user-service');
const {User , Role} = require('./models/index');

app.get('/', (req, res) => res.send('Hello World!'))


const prepareAndStartServer = async () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));
    
    app.use('/api', apiRoutes);

    app.listen(PORT, () => {
        console.log(`Server started ${PORT}`);
    })

    if(process.env.DB_SYNC){
        db.sequelize.sync({alter : true});
    }

    const u1 = await User.findByPk(1);
    const r1 = await Role.findByPk(1);
    u1.addRole(r1);

    // const service = new UserService();
    // const newToken = service.createToken({email : 'aktfang@gmail.com' ,id : 1});
    // console.log(newToken)
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFrdGZhbmdAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTY5ODI1Mzc0OCwiZXhwIjoxNjk4MjU3MzQ4fQ.0nG6XNuhIWyw_f9XFxP5dMTeHEvvtfdpF4QJThSzd64';
    // const response = service.verifyToken(token);
    // console.log(response);
}   

prepareAndStartServer();