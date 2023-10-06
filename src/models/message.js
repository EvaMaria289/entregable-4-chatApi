'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
   
    static associate(models) {
      
      Message.belongsTo(models.User, {foreignKey: 'senderId'})
      Message.belongsTo(models.Conversation, {foreignKey: 'conversationId'})
    }
  }
  Message.init({
    content: DataTypes.TEXT,
    senderId: DataTypes.INTEGER,
    conversationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Message',
    timestamps: true,
    updatedAt: false
  });
  return Message;
};