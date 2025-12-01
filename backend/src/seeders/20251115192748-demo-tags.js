'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tags', [
      {
        title: 'Bloqueado para WA',
        color: "indigo",
        created_at: new Date,
        updated_at: new Date
      },
      {
        title: 'Baja Interacción',
        color: "pink",
        created_at: new Date,
        updated_at: new Date
      },
      {
        title: 'Cliente Referido',
        color: "gray",
        created_at: new Date,
        updated_at: new Date

      },
      {
        title: 'Riesgo de Abandono',
        color: "yellow",
        created_at: new Date,
        updated_at: new Date
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tags', null, {});
  }
};
