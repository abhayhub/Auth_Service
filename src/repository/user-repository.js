const { User , Role } = require('../models/index');


class UserRepository {

    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
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
            const result = await User.findOne({
                where : {
                    email : userEmail
                }
            });
            return result;
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