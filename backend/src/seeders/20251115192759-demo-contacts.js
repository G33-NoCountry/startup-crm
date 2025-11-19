'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('contacts', [
      {
        full_name: "Contact1",
        phone: "+541122222222",
        created_at: new Date,
        updated_at: new Date

      },
      {
        full_name: "Contact2",
        email: "contact2@mail.com",
        phone: "+541111111111",
        created_at: new Date,
        updated_at: new Date

      },
      {
        full_name: "Contact3",
        email: "contact3@mail.com",
        created_at: new Date,
        updated_at: new Date
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('contacts', null, {});
  }
};
