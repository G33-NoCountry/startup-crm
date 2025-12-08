'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tasks', [
      // USER 1
      {
        user_id: 1,
        deal_id: 3,
        contact_id: 2,
        title: "Programar seguimiento de propuestas enviadas",
        due_date: new Date("2025-09-07T10:15:00Z"),
        status: false,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 1,
        deal_id: null,
        contact_id: 6,
        title: "Confirmar disponibilidad para reunión de actualización",
        due_date: new Date("2025-09-12T14:40:00Z"),
        status: true,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 1,
        deal_id: 1,
        contact_id: null,
        title: "Revisar notas de interacción y actualizar el perfil del contacto",
        due_date: new Date("2025-10-01T09:05:00Z"),
        status: false,
        created_at: new Date,
        updated_at: new Date
      },

      // USER 2
      {
        user_id: 2,
        deal_id: null,
        contact_id: 1,
        title: "Enviar recordatorio de renovación de servicio",
        due_date: new Date("2025-09-18T16:20:00Z"),
        status: false,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 2,
        deal_id: 5,
        contact_id: 4,
        title: "Actualizar scoring del lead según interacción del mes",
        due_date: new Date("2025-10-03T11:12:00Z"),
        status: false,
        created_at: new Date,
        updated_at: new Date
      },

      // USER 3
      {
        user_id: 3,
        deal_id: 3,
        contact_id: 4,
        title: "Coordinar llamada para presentación del roadmap del producto",
        due_date: new Date("2025-09-22T13:30:00Z"),
        status: false,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 3,
        deal_id: 2,
        contact_id: null,
        title: "Registrar feedback de reunión técnica en el CRM",
        due_date: new Date("2025-10-15T10:00:00Z"),
        status: true,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 3,
        deal_id: null,
        contact_id: 7,
        title: "Enviar propuesta comercial revisada",
        due_date: new Date("2025-11-04T17:25:00Z"),
        status: false,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 3,
        deal_id: 1,
        contact_id: 3,
        title: "Actualizar documentación del cliente en el sistema",
        due_date: new Date("2025-12-01T08:55:00Z"),
        status: false,
        created_at: new Date,
        updated_at: new Date
      },

      // USER 4
      {
        user_id: 4,
        deal_id: 7,
        contact_id: 5,
        title: "Validar datos de facturación antes del cierre del mes",
        due_date: new Date("2025-09-29T09:42:00Z"),
        status: true,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 4,
        deal_id: null,
        contact_id: null,
        title: "Registrar actualización de pipeline trimestral",
        due_date: new Date("2025-10-20T12:05:00Z"),
        status: false,
        created_at: new Date,
        updated_at: new Date
      },

      // USER 5
      {
        user_id: 5,
        deal_id: 4,
        contact_id: 2,
        title: "Armar informe de métricas del equipo comercial",
        due_date: new Date("2025-09-11T15:30:00Z"),
        status: false,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 5,
        deal_id: null,
        contact_id: 6,
        title: "Enviar onboarding automático a nuevo cliente",
        due_date: new Date("2025-10-08T09:00:00Z"),
        status: true,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 5,
        deal_id: 8,
        contact_id: null,
        title: "Actualizar estado de oportunidad tras reunión",
        due_date: new Date("2025-11-15T11:10:00Z"),
        status: false,
        created_at: new Date,
        updated_at: new Date
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tasks', null, {});
  }
};
