'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tags', [
      {
        title: 'Bloqueado para WA',
        color: "002884",
        created_at: new Date,
        updated_at: new Date
      },
      {
        title: 'Baja Interacción',
        color: "457ce8",
        created_at: new Date,
        updated_at: new Date
      },
      {
        title: 'Cliente Referido',
        color: "732ce1",
        created_at: new Date,
        updated_at: new Date

      },
      {
        title: 'Riesgo de Abandono',
        color: "157cg8",
        created_at: new Date,
        updated_at: new Date
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tags', null, {});
  }
};
