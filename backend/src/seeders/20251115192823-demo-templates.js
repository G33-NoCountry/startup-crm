'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('templates', [
      {
        user_id: 1,
        title: "Confirmar propuesta",
        channel: "whatsapp",
        content: "Texto del mensaje",
        status: 1,
        created_at: new Date,
        updated_at: new Date

      },
      {
        user_id: 2,
        title: "Bienvenida Lead WA",
        channel: "email",
        content: "Texto del mail",
        status: 0,
        created_at: new Date,
        updated_at: new Date

      },
      {
        user_id: 2,
        title: "Seguimiento Propuesta Email",
        channel: "email",
        content: "Texto del mail",
        status: 0,
        created_at: new Date,
        updated_at: new Date
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('templates', null, {});
  }
};
