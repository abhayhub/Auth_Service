const UserRepository  = require('../repository/user-repository');
const jwt  = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');
const bcrypt = require('bcrypt');
class UserService{

    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw error;
        }
    }

    async signIn(email, password){
        try {
    //step1 :- fetch the user using the email
            const user = await this.userRepository.getByEmail(email);

    //step 2:- compare incoming paswd with encrypted pswd
            const pswdmatch = this.checkPassword(password,user.password);
            if(!pswdmatch){
                console.log("Password doesn't match");
                throw {error : 'Incorrect password'}
            }

    //step 3 :- if pswd match then create a token and send it to the user
            const newJWT = this.createToken({email : user.email, id : user.id});
            return newJWT;
        } catch (error) {
            console.log("Something went wrong in sign in process.");
            throw error;
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user , JWT_KEY , {expiresIn : '1d'});
            return result;
        } catch (error) {
            console.log("Something went wrong in token creationg");
            throw error;
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token validation");
            throw error;
        }
    }

    checkPassword(userInputPlainPswd, encryptedPswd){
        try {
            return bcrypt.compareSync(userInputPlainPswd,encryptedPswd);
        } catch (error) {
            console.log("Something went wrong in password validation");
            throw error;
        }
    }

    async isAuthenticated(token){
        try {
            const response = this.verifyToken(token);
            if(!response){
                throw {error : 'Invalid token'}
            }
            const user = await this.userRepository.getById(response.id);
            if(!user){
                throw {error : 'No user with the corresponding token exists'};
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in sign in process.");
            throw error;
        }
    }

}

module.exports = UserService;