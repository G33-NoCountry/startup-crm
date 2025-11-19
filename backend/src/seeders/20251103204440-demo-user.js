'use strict';

const { hashSync } = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = hashSync("12345678", 10);
    await queryInterface.bulkInsert('users', [
      {
        full_name: "user1",
        email: 'user@mail.com',
        password: hashedPassword,
        role: 'admin',
        status: false,
        created_at: new Date,
        updated_at: new Date
      },
      {
        full_name: "user2",
        email: 'user2@mail.com',
        password: hashedPassword,
        role: 'agent',
        status: true,
        created_at: new Date,
        updated_at: new Date
      },
      {
        full_name: "user3",
        email: 'user3@mail.com',
        password: hashedPassword,
        role: 'manager',
        status: false,
        created_at: new Date,
        updated_at: new Date
      },
    ],);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
