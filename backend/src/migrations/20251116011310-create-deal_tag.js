'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("deal_tag", {
      deal_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "deals" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      tag_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "tags" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
    });

    await queryInterface.addConstraint("deal_tag", {
      fields: ["deal_id", "tag_id"],
      type: "primary key",
      name: "pk_deal_tag"
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("deal_tag");
  }
};
