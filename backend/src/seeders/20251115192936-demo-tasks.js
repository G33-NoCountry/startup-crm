'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tasks', [
      {
        user_id: 1,
        deal_id: 1,
        // contact_id: 1,
        title: "Llamar para confirmar propuesta",
        due_date: new Date,
        status: false,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 1,
        // deal_id: 2,
        contact_id: 3,
        title: "Subir documentos",
        due_date: new Date,
        status: false,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 2,
        // deal_id: 2,
        // contact_id: 2,
        title: "Enviar información",
        due_date: new Date,
        status: false,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 4,
        // deal_id: 2,
        // contact_id: 2,
        title: "Implementar notificaciones de nuevos mensajes en tiempo real",
        due_date: new Date,
        status: false,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 3,
        deal_id: 1,
        contact_id: 2,
        title: "Agregar soporte para paginado incremental de mensajes",
        due_date: new Date,
        status: false,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 3,
        deal_id: 5,
        // contact_id: 2,
        title: "Implementar carga de mensajes antiguos al hacer scroll",
        due_date: new Date,
        status: false,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 1,
        // deal_id: 2,
        contact_id: 2,
        title: "Reorganizar estructura de carpetas del proyecto",
        due_date: new Date,
        status: false,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 3,
        deal_id: 3,
        contact_id: 4,
        title: "Agregar logger estructurado para auditoría",
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
