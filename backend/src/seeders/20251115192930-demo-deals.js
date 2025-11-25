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
        value: 30500,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 2,
        contact_id: 2,
        funnel_stage_id: 2,
        title: "Integración API",
        value: 150000,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 1,
        contact_id: 3,
        funnel_stage_id: 2,
        title: "Optimización de procesos",
        value: 82000,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 3,
        contact_id: 2,
        funnel_stage_id: 2,
        title: "Migración a la nube",
        value: 70000,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 3,
        contact_id: 2,
        funnel_stage_id: 1,
        title: "Auditoría de infraestructura",
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 1,
        contact_id: 2,
        funnel_stage_id: 3,
        title: "Campaña Ads",
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 1,
        contact_id: 3,
        funnel_stage_id: 3,
        title: "Social Media Revamp",
        value: 64200,
        created_at: new Date,
        updated_at: new Date
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('deals', null, {});
  }
};
