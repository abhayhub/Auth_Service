// const { ValidationError } = require('sequelize');
const { User , Role } = require('../models/index');
const ValidationError = require('../utils/validation-errors');
const { StatusCodes } = require('http-status-codes');

class UserRepository {

    async create(data) {
        try {
            const user = await User.create(data);
            return user; 
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
                throw new ValidationError(error);
                
            }
            
            console.log("Something went wrong at repository level");
            throw error;
        }
    }

    async destroy(userId) {
        try {
            const user = await User.destroy({
                where : {
                    id : userId
                }
            });
            return true;
        } catch (error) {
            console.log("Something went wrong at repository level");
            throw error;
        }
    }

    async getById(userid){
        try {
            const user = await User.findByPk(userid , {
//attributes property used for selecting some attributes from the table;
                attributes : ['email','id']
            });
            return user;
        } catch (error) {
            console.log("Something went wrong at repository level");
            throw error;
        }
    }

    async getByEmail(userEmail) { 
        try {
            const user = await User.findOne({
                where : {
                    email : userEmail
                }
            });
            if(!user){
                throw new ClientError(
                    'AttributeNotFound',
                    'Invalid email sent in the request ',
                    'Please check the email , as there is no record of the email',
                    StatusCodes.NOT_FOUND
                );
            }
            return user;
        } catch (error) {
            console.log("Something went wrong at repository level");
            throw error;
        }
    }


    async isAdmin(userId){
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where : {
                    name : 'ADMIN'
                }
            });
            return user.hasRole(adminRole);
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }
}

module.exports = UserRepository;