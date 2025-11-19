'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('deal_tag', [
      {
        deal_id: 1,
        tag_id: 2,
      },
      {
        deal_id: 2,
        tag_id: 1,
      },
      {
        deal_id: 2,
        tag_id: 3,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('deal_tag', null, {});
  }
};
