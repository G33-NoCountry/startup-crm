'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("contact_tag", {
      contact_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "contacts" },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      tag_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "tags" },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    });

    await queryInterface.addConstraint("contact_tag", {
      fields: ["contact_id", "tag_id"],
      type: "primary key",
      name: "pk_contact_tag"
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("contact_tag");
  }
};
