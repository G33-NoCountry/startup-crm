'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('deals', [
      {
        user_id: 1,
        contact_id: 1,
        funnel_stage_id: 1,
        title: "Premium Package",
        value: 43000,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 2,
        contact_id: 1,
        funnel_stage_id: 3,
        title: "Servicio de Mantenimiento",
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 2,
        contact_id: 2,
        funnel_stage_id: 2,
        title: "Otro servicio",
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 1,
        contact_id: 3,
        funnel_stage_id: 2,
        title: "Otro servicio 2",
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 3,
        contact_id: 2,
        funnel_stage_id: 2,
        title: "Otro servicio 3",
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 3,
        contact_id: 2,
        funnel_stage_id: 1,
        title: "Otro servicio 4",
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 1,
        contact_id: 2,
        funnel_stage_id: 3,
        title: "Otro servicio 5",
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 1,
        contact_id: 3,
        funnel_stage_id: 3,
        title: "Otro servicio 6",
        created_at: new Date,
        updated_at: new Date
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('deals', null, {});
  }
};
