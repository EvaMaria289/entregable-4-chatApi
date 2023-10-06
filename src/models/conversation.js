'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
   
    static associate(models) {
     
      Conversation.hasMany(models.Message, {foreignKey: 'conversationId'})
      Conversation.belongsTo(models.User, {foreignKey: 'createdBy'})
      Conversation.belongsToMany(models.User, {through: 'Participant'})
      Conversation.hasMany(models.Participant, {foreignKey: 'ConversationId'})
    }
  }
  Conversation.init({
    title: DataTypes.STRING,
    conversationImage: DataTypes.STRING,
    type: DataTypes.ENUM('single', 'group'),
    createdBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Conversation',
    timestamps: true,
    updatedAt: false
  });
  return Conversation;
};