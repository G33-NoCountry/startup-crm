'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('funnel_stages', [
      {
        title: "Nuevo",
        sort_order: 1,
        is_closed: 0,
        created_at: new Date,
        updated_at: new Date
      },
      {
        title: "Contactado",
        sort_order: 3,
        is_closed: 0,
        created_at: new Date,
        updated_at: new Date

      },
      {
        title: "Interesado",
        sort_order: 2,
        is_closed: 0,
        created_at: new Date,
        updated_at: new Date

      },
      {
        title: "Propuesta enviada",
        sort_order: 4,
        is_closed: 0,
        created_at: new Date,
        updated_at: new Date

      },
      {
        title: "Cerrado-Ganado",
        sort_order: 5,
        is_closed: 1,
        created_at: new Date,
        updated_at: new Date

      },
      {
        title: "Cerrado-Perdido",
        sort_order: 6,
        is_closed: 1,
        created_at: new Date,
        updated_at: new Date
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('funnel_stages', null, {});
  }
};
