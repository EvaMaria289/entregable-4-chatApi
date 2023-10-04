'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      senderId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Users',  //nuestra llave foranea
          key: 'id'
        }
      },
      conversationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Conversations',  //nuestra llave foranea
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Messages');
  }
};