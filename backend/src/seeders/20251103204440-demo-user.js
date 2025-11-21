'use strict';

const { hashSync } = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = hashSync("password1Ab_", 10);
    await queryInterface.bulkInsert('users', [
      {
        full_name: "User one",
        email: 'user@mail.com',
        password: hashedPassword,
        role: 'Admin',
        status: true,
        avatar_color: "ff0033",
        created_at: new Date,
        updated_at: new Date
      },
      {
        full_name: "User two",
        email: 'user2@mail.com',
        password: hashedPassword,
        role: 'Agente',
        status: true,
        avatar_color: "4e9480",
        created_at: new Date,
        updated_at: new Date
      },
      {
        full_name: "User three",
        email: 'user3@mail.com',
        password: hashedPassword,
        role: 'Manager',
        status: true,
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
