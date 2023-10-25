'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')
const  { SALT } = require('../config/serverConfig')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : true,
      validate : {
        isEmail : true
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        // password must have more than 3 character and < 50 character
        len : [3,50]
    }
  }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user) => {
    const encryptedPwd = bcrypt.hashSync(user.password,SALT);
    user.password = encryptedPwd;
  });
  return User;
};