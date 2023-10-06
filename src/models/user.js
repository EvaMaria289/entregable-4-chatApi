'use strict';

const bcrypt = require("bcrypt");
const sendWelcomeEmail = require('../helpers/sendMail');



const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
     
      User.hasMany(models.Message, {foreignKey: 'senderId'})
      User.hasMany(models.Conversation, {foreignKey: 'createdBy'})
      User.belongsToMany(models.Conversation, {through: 'Participant'})
      User.hasMany(models.Participant, {foreignKey: 'UserId'})
      
    }
  }
  User.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar: DataTypes.STRING,
    password: DataTypes.STRING,
    description: DataTypes.STRING,
    validEmail: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    hooks: { 
      beforeCreate: async (user, options) => {
        const hashed = await bcrypt.hash(user.password, 10)
        user.password = hashed
      },
      afterCreate: async (user, options) => {
        const { email, firstname, lastname } = user;
        
        sendWelcomeEmail(email, {firstname, lastname})
      }
    },
  });
  return User;
};