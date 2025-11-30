'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('messages', [
      {
        conversation_id: 2,
        sender_type: "User",
        sender_id: 1,
        content: "Hola, ¿cómo estás?",
        created_at: new Date("2025-09-05T10:12:30Z"),
        updated_at: new Date("2025-09-05T10:12:30Z")
      },
      {
        conversation_id: 5,
        sender_type: "Contact",
        sender_id: 1,
        content: "Te comparto la información solicitada.",
        created_at: new Date("2025-09-18T14:25:10Z"),
        updated_at: new Date("2025-09-18T14:25:10Z")
      },
      {
        conversation_id: 2,
        sender_type: "User",
        sender_id: 1,
        content: "Mensaje automático enviado por el sistema.",
        created_at: new Date("2025-10-02T08:02:00Z"),
        updated_at: new Date("2025-10-02T08:02:00Z")
      },
      {
        conversation_id: 7,
        sender_type: "User",
        sender_id: 2,
        content: "Perfecto, gracias por tu respuesta.",
        created_at: new Date("2025-10-07T08:02:00Z"),
        updated_at: new Date("2025-10-07T08:02:00Z")
      },
      {
        conversation_id: 3,
        sender_type: "User",
        sender_id: 2,
        content: "¿Podemos coordinar una reunión mañana?",
        created_at: new Date("2025-10-11T18:45:50Z"),
        updated_at: new Date("2025-10-11T18:45:50Z")
      },
      {
        conversation_id: 10,
        sender_type: "User",
        sender_id: 1,
        content: "Quería consultar sobre el estado de mi pedido.",
        created_at: new Date("2025-10-27T12:10:45Z"),
        updated_at: new Date("2025-10-27T12:10:45Z")
      },
      {
        conversation_id: 6,
        sender_type: "User",
        sender_id: 3,
        content: "Ya está todo resuelto.",
        created_at: new Date("2025-11-03T09:32:14Z"),
        updated_at: new Date("2025-11-03T09:32:14Z")
      },
      {
        conversation_id: 6,
        sender_type: "User",
        sender_id: 1,
        content: "Hola, hablé por el formulario del sitio y quería más información sobre el servicio.",
        created_at: new Date("2025-11-03T10:32:14Z"),
        updated_at: new Date("2025-11-03T10:32:14Z")
      },
      {
        conversation_id: 4,
        sender_type: "User",
        sender_id: 1,
        content: "Perfecto, ¿te gustaría agendar una demo para mostrarte el flujo completo?.",
        created_at: new Date("2025-11-03T12:32:14Z"),
        updated_at: new Date("2025-11-03T12:32:14Z")
      },
      {
        conversation_id: 6,
        sender_type: "User",
        sender_id: 1,
        content: "Gracias por tu consulta. ¿Estás evaluando implementar la solución este mes?.",
        created_at: new Date("2025-11-03T15:32:14Z"),
        updated_at: new Date("2025-11-03T15:32:14Z")
      },
      {
        conversation_id: 6,
        sender_type: "User",
        sender_id: 1,
        content: "Sí, estamos viendo opciones y quería entender mejor las funcionalidades.",
        created_at: new Date("2025-11-03T17:32:14Z"),
        updated_at: new Date("2025-11-03T17:32:14Z")
      },
      {
        conversation_id: 6,
        sender_type: "User",
        sender_id: 1,
        content: "Perfecto, ¿te gustaría agendar una demo para mostrarte el flujo completo?.",
        created_at: new Date("2025-11-03T17:40:14Z"),
        updated_at: new Date("2025-11-03T17:40:14Z")
      },
      {
        conversation_id: 6,
        sender_type: "Contact",
        sender_id: 1,
        content: "Sí, podría mañana por la tarde.",
        created_at: new Date("2025-11-03T18:00:14Z"),
        updated_at: new Date("2025-11-03T18:00:14Z")
      },
      {
        conversation_id: 6,
        sender_type: "Contact",
        sender_id: 1,
        content: "Dale, te reservo un espacio a las 15:00. ¿Te queda bien?.",
        created_at: new Date("2025-11-03T19:00:14Z"),
        updated_at: new Date("2025-11-03T19:00:14Z")
      },
      {
        conversation_id: 6,
        sender_type: "User",
        sender_id: 1,
        content: "Sí, confirmado. ¿La reunión es por videollamada?.",
        created_at: new Date("2025-11-03T19:30:14Z"),
        updated_at: new Date("2025-11-03T19:30:14Z")
      },
      {
        conversation_id: 6,
        sender_type: "Contact",
        sender_id: 1,
        content: "Exacto, te comparto el enlace unos minutos antes.",
        created_at: new Date("2025-11-04T15:30:14Z"),
        updated_at: new Date("2025-11-04T15:30:14Z")
      },
      {
        conversation_id: 6,
        sender_type: "Contact",
        sender_id: 1,
        content: "Genial, gracias. También quisiera saber si tienen integración con WhatsApp.",
        created_at: new Date("2025-11-05T17:33:14Z"),
        updated_at: new Date("2025-11-05T17:33:14Z")
      },
      {
        conversation_id: 2,
        sender_type: "User",
        sender_id: 1,
        content: "Notificación: tu ticket ha sido asignado.",
        created_at: new Date("2025-11-10T16:22:00Z"),
        updated_at: new Date("2025-11-10T16:22:00Z")
      },
      {
        conversation_id: 3,
        sender_type: "Contact",
        sender_id: 1,
        content: "En unos minutos te respondo.",
        created_at: new Date("2025-11-15T07:12:55Z"),
        updated_at: new Date("2025-11-15T07:12:55Z")
      },
      {
        conversation_id: 4,
        sender_type: "User",
        sender_id: 1,
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
