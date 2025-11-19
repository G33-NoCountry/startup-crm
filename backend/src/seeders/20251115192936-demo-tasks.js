'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tasks', [
      {
        user_id: 1,
        deal_id: 1,
        contact_id: 1,
        title: "Llamar para confirmar propuesta",
        due_date: new Date,
        status: false,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 1,
        deal_id: 2,
        contact_id: 3,
        title: "Subir documentos",
        due_date: new Date,
        status: false,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 2,
        deal_id: 2,
        contact_id: 2,
        title: "Enviar información",
        due_date: new Date,
        status: false,
        created_at: new Date,
        updated_at: new Date
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tasks', null, {});
  }
};
