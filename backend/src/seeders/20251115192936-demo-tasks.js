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
        start_date: new Date("2025-09-07T10:15:00Z"),
        due_date: new Date("2025-09-10T10:15:00Z"),
        color: "purple",
        status: false,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 1,
        deal_id: null,
        contact_id: 6,
        title: "Confirmar disponibilidad para reunión de actualización",
        start_date: new Date("2025-09-12T14:40:00Z"),
        due_date: new Date("2025-09-13T14:40:00Z"),
        color: "green",
        status: true,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 1,
        deal_id: 1,
        contact_id: null,
        title: "Revisar notas de interacción y actualizar el perfil del contacto",
        start_date: new Date("2025-10-01T09:05:00Z"),
        due_date: new Date("2025-10-02T09:05:00Z"),
        color: "red",
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
        start_date: new Date("2025-09-18T16:20:00Z"),
        due_date: new Date("2025-09-24T16:20:00Z"),
        color: "orange",
        status: false,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 2,
        deal_id: 5,
        contact_id: 4,
        title: "Actualizar scoring del lead según interacción del mes",
        start_date: new Date("2025-10-03T11:12:00Z"),
        due_date: new Date("2025-10-10T11:12:00Z"),
        color: "blue",
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
        start_date: new Date("2025-09-22T13:30:00Z"),
        due_date: new Date("2025-09-25T13:30:00Z"),
        color: "pink",
        status: false,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 3,
        deal_id: 2,
        contact_id: null,
        title: "Registrar feedback de reunión técnica en el CRM",
        start_date: new Date("2025-10-15T10:00:00Z"),
        due_date: new Date("2025-10-16T10:00:00Z"),
        color: "indigo",
        status: true,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 3,
        deal_id: null,
        contact_id: 7,
        title: "Enviar propuesta comercial revisada",
        start_date: new Date("2025-11-04T17:25:00Z"),
        due_date: new Date("2025-11-06T17:25:00Z"),
        color: "gray",
        status: false,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 3,
        deal_id: 1,
        contact_id: 3,
        title: "Actualizar documentación del cliente en el sistema",
        start_date: new Date("2025-12-01T08:55:00Z"),
        due_date: new Date("2025-12-03T08:55:00Z"),
        color: "green",
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
        start_date: new Date("2025-09-29T09:42:00Z"),
        due_date: new Date("2025-09-30T09:42:00Z"),
        color: "red",
        status: true,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 4,
        deal_id: null,
        contact_id: null,
        title: "Registrar actualización de pipeline trimestral",
        start_date: new Date("2025-10-20T12:05:00Z"),
        due_date: new Date("2025-10-22T12:05:00Z"),
        color: "red",
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
        start_date: new Date("2025-09-11T15:30:00Z"),
        due_date: new Date("2025-09-12T15:30:00Z"),
        color: "lime",
        status: false,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 5,
        deal_id: null,
        contact_id: 6,
        title: "Enviar onboarding automático a nuevo cliente",
        start_date: new Date("2025-10-08T09:00:00Z"),
        due_date: new Date("2025-10-11T09:00:00Z"),
        color: "yellow",
        status: true,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 5,
        deal_id: 8,
        contact_id: null,
        title: "Actualizar estado de oportunidad tras reunión",
        start_date: new Date("2025-11-15T11:10:00Z"),
        due_date: new Date("2025-11-18T11:10:00Z"),
        color: "sky",
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
