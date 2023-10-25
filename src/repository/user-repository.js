const { User } = require('../models/index');


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



}

module.exports = UserRepository;