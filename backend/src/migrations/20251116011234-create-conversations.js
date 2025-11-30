'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("conversations", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      contact_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "contacts" },
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      channel: {
        type: Sequelize.ENUM('whatsapp', 'email'),
        allowNull: false,
      },
      last_interaction: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("conversations");
  }
};
