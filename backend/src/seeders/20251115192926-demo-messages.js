'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('messages', [
      {
        conversation_id: 2,
        user_id: 1,
        content: "Hola, ¿cómo estás?",
        created_at: new Date("2025-09-05T10:12:30Z"),
        updated_at: new Date("2025-09-05T10:12:30Z")
      },
      {
        conversation_id: 5,
        user_id: 3,
        content: "Te comparto la información solicitada.",
        created_at: new Date("2025-09-18T14:25:10Z"),
        updated_at: new Date("2025-09-18T14:25:10Z")
      },
      {
        conversation_id: 2,
        user_id: 1,
        content: "Mensaje automático enviado por el sistema.",
        created_at: new Date("2025-10-02T08:02:00Z"),
        updated_at: new Date("2025-10-02T08:02:00Z")
      },
      {
        conversation_id: 7,
        user_id: 2,
        content: "Perfecto, gracias por tu respuesta.",
        created_at: new Date("2025-10-07T08:02:00Z"),
        updated_at: new Date("2025-10-07T08:02:00Z")
      },
      {
        conversation_id: 3,
        user_id: 2,
        content: "¿Podemos coordinar una reunión mañana?",
        created_at: new Date("2025-10-11T18:45:50Z"),
        updated_at: new Date("2025-10-11T18:45:50Z")
      },
      {
        conversation_id: 10,
        user_id: 4,
        content: "Quería consultar sobre el estado de mi pedido.",
        created_at: new Date("2025-10-27T12:10:45Z"),
        updated_at: new Date("2025-10-27T12:10:45Z")
      },
      {
        conversation_id: 6,
        user_id: 3,
        content: "Ya está todo resuelto.",
        created_at: new Date("2025-11-03T09:32:14Z"),
        updated_at: new Date("2025-11-03T09:32:14Z")
      },
      {
        conversation_id: 2,
        user_id: 1,
        content: "Notificación: tu ticket ha sido asignado.",
        created_at: new Date("2025-11-10T16:22:00Z"),
        updated_at: new Date("2025-11-10T16:22:00Z")
      },
      {
        conversation_id: 3,
        user_id: 2,
        content: "En unos minutos te respondo.",
        created_at: new Date("2025-11-15T07:12:55Z"),
        updated_at: new Date("2025-11-15T07:12:55Z")
      },
      {
        conversation_id: 4,
        user_id: 4,
        content: "¿Tenés disponibilidad esta semana?",
        created_at: new Date("2025-11-20T21:44:30Z"),
        updated_at: new Date("2025-11-20T21:44:30Z")
      }

    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('messages', null, {});
  }
};
