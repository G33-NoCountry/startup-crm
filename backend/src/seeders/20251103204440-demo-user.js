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
        role: 'Admin',
        status: false,
        avatar_color: "FF0033",
        created_at: new Date,
        updated_at: new Date
      },
      {
        full_name: "user2",
        email: 'user2@mail.com',
        password: hashedPassword,
        role: 'Agente',
        status: true,
        avatar_color: "4e9480",
        created_at: new Date,
        updated_at: new Date
      },
      {
        full_name: "user3",
        email: 'user3@mail.com',
        password: hashedPassword,
        role: 'Manager',
        status: false,
        avatar_color: "a24bbd",
        created_at: new Date,
        updated_at: new Date
      },
    ],);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
