'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('conversations', [
      {
        contact_id: 1,
        status: 1,
        channel: 'whatsapp',
        created_at: new Date,
        updated_at: new Date
      },
      {
        contact_id: 2,
        status: 0,
        channel: 'email',
        last_interaction: new Date,
        created_at: new Date,
        updated_at: new Date
      },
      {
        contact_id: 3,
        status: 1,
        channel: 'whatsapp',
        created_at: new Date,
        updated_at: new Date
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('conversations', null, {});
  }
};
