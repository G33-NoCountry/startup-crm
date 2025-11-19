'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('contact_tag', [
      {
        contact_id: 1,
        tag_id: 2,
      },
      {
        contact_id: 2,
        tag_id: 1,
      },
      {
        contact_id: 1,
        tag_id: 3,
      },
      {
        contact_id: 3,
        tag_id: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('contact_tag', null, {});
  }
};
