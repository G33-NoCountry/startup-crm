'use strict';

const { hashSync } = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = hashSync("password1Ab_", 10);
    await queryInterface.bulkInsert('users', [
      {
        full_name: "Juan Perez",
        email: 'admin@admin.com',
        password: hashedPassword,
        role: 'Admin',
        status: true,
        avatar_color: "ff0033",
        created_at: new Date,
        updated_at: new Date
      },
      {
        full_name: "Jose Mendez",
        email: 'agente@agente.com',
        password: hashedPassword,
        role: 'Agente',
        status: true,
        avatar_color: "4e9480",
        created_at: new Date,
        updated_at: new Date
      },
      {
        full_name: "Jimena Lopez",
        email: 'manager@manager.com',
        password: hashedPassword,
        role: 'Manager',
        status: true,
        avatar_color: "a24bbd",
        created_at: new Date,
        updated_at: new Date
      },
      {
        full_name: "Hernan Gomez",
        email: 'hernan@admin.com',
        password: hashedPassword,
        role: 'Agente',
        status: true,
        avatar_color: "a24bbd",
        created_at: new Date,
        updated_at: new Date
      },
      {
        full_name: "Valeria Gomez",
        email: 'valeria@agente.com',
        password: hashedPassword,
        role: 'Admin',
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
