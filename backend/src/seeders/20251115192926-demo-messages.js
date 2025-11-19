'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('messages', [
      {
        contact_id: 1,
        conversation_id: 1,
        user_id: 1,
        content: "Mensaje",
        created_at: new Date,
        updated_at: new Date
      },
      {
        contact_id: 1,
        conversation_id: 1,
        user_id: 1,
        content: "Otro mensaje",
        created_at: new Date,
        updated_at: new Date
      },
      {
        contact_id: 1,
        conversation_id: 1,
        user_id: 1,
        content: "Mensaje 3",
        created_at: new Date,
        updated_at: new Date
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('messages', null, {});
  }
};
