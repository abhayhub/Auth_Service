const UserService = require('../services/user-service');

const userService = new UserService();

const singup = async (req, res) => {
    try {
        const response = await userService.create({
            email : req.body.email,
            password : req.body.password
        });
        return res.status(201).json({
            message : 'Successfully created a new user',
            data : response,
            success : true,
            err : {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : 'Something went wrong',
            data : {},
            success : false,
            err : error
        })
    }
}

 
const singin = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(201).json({
            message : 'Successfully Signin',
            data : response,
            success : true,
            err : {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : 'Something went wrong',
            data : {},
            success : false,
            err : error
        })
    }
}

const isAuthenticated = async (req,res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success : true,
            err : {},
            data : response,
            message : 'user is authenticated and token is valid'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : 'Something went wrong',
            data : {},
            success : false,
            err : error
        })
    }
}

module.exports = {
    singup,
    singin,
    isAuthenticated
}