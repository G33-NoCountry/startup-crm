'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('messages', [
      // -------------------------
      // CONVERSACIÓN 1 (contacto 1)
      // -------------------------
      { conversation_id: 1, sender_type: "Contact", sender_id: 1, channel: "whatsapp", content: "Hola, ¿tenés un minuto?", created_at: new Date("2025-09-07T13:45:10Z"), updated_at: new Date("2025-09-07T13:45:10Z") },
      { conversation_id: 1, sender_type: "User", sender_id: 3, channel: "whatsapp", content: "Sí, decime.", created_at: new Date("2025-09-07T13:46:00Z"), updated_at: new Date("2025-09-07T13:46:00Z") },
      { conversation_id: 1, sender_type: "Contact", sender_id: 1, channel: "whatsapp ", content: "Necesito info del servicio.", created_at: new Date("2025-09-07T14:05:21Z"), updated_at: new Date("2025-09-07T14:05:21Z") },
      { conversation_id: 1, sender_type: "User", sender_id: 2, channel: "whatsapp", content: "Te paso ahora.", created_at: new Date("2025-09-07T14:18:10Z"), updated_at: new Date("2025-09-07T14:18:10Z") },

      // -------------------------
      // CONVERSACIÓN 2 (solo 1 mensaje)
      // -------------------------
      { conversation_id: 2, sender_type: "Contact", sender_id: 1, channel: "email", content: "¿El mail que recibí es correcto?", created_at: new Date("2025-10-03T09:20:20Z"), updated_at: new Date("2025-10-03T09:20:20Z") },

      // -------------------------
      // CONVERSACIÓN 3 (contacto 1)
      // -------------------------
      { conversation_id: 3, sender_type: "User", sender_id: 5, channel: "whatsapp", content: "¿Pudiste ver la propuesta?", created_at: new Date("2025-11-15T17:00:55Z"), updated_at: new Date("2025-11-15T17:00:55Z") },
      { conversation_id: 3, sender_type: "Contact", sender_id: 1, channel: "whatsapp", content: "Sí, ahora te consulto algo.", created_at: new Date("2025-11-15T17:40:11Z"), updated_at: new Date("2025-11-15T17:40:11Z") },
      { conversation_id: 3, sender_type: "User", sender_id: 3, channel: "whatsapp", content: "Decime nomás.", created_at: new Date("2025-11-15T18:10:40Z"), updated_at: new Date("2025-11-15T18:10:40Z") },
      { conversation_id: 3, sender_type: "Contact", sender_id: 1, channel: "whatsapp", content: "Listo, gracias!", created_at: new Date("2025-11-15T18:30:55Z"), updated_at: new Date("2025-11-15T18:30:55Z") },

      // -------------------------
      // CONVERSACIÓN 4 (solo 1 mensaje)
      // -------------------------
      { conversation_id: 4, sender_type: "Contact", sender_id: 2, channel: "whatsapp", content: "Hola, ¿me podrás pasar el archivo?", created_at: new Date("2025-09-22T11:25:10Z"), updated_at: new Date("2025-09-22T11:25:10Z") },

      // -------------------------
      // CONVERSACIÓN 5
      // -------------------------
      { conversation_id: 5, sender_type: "User", sender_id: 1, channel: "email", content: "Te reenvié el documento.", created_at: new Date("2025-11-02T15:30:11Z"), updated_at: new Date("2025-11-02T15:30:11Z") },
      { conversation_id: 5, sender_type: "Contact", sender_id: 2, channel: "email", content: "Gracias, ahora lo veo.", created_at: new Date("2025-11-02T16:10:05Z"), updated_at: new Date("2025-11-02T16:10:05Z") },
      { conversation_id: 5, sender_type: "User", sender_id: 4, channel: "email", content: "Cualquier duda avisame.", created_at: new Date("2025-11-02T16:40:33Z"), updated_at: new Date("2025-11-02T16:40:33Z") },
      { conversation_id: 5, sender_type: "Contact", sender_id: 2, channel: "email", content: "Perfecto.", created_at: new Date("2025-11-02T16:59:22Z"), updated_at: new Date("2025-11-02T16:59:22Z") },

      // -------------------------
      // CONVERSACIÓN 6
      // -------------------------
      { conversation_id: 6, sender_type: "Contact", sender_id: 3, channel: "whatsapp", content: "Buenos días!", created_at: new Date("2025-09-10T09:00:33Z"), updated_at: new Date("2025-09-10T09:00:33Z") },
      { conversation_id: 6, sender_type: "User", sender_id: 2, channel: "whatsapp", content: "Hola! ¿En qué te ayudo?", created_at: new Date("2025-09-10T09:10:40Z"), updated_at: new Date("2025-09-10T09:10:40Z") },
      { conversation_id: 6, sender_type: "Contact", sender_id: 3, channel: "whatsapp", content: "Consulta sobre el plan premium.", created_at: new Date("2025-09-10T09:35:20Z"), updated_at: new Date("2025-09-10T09:35:20Z") },
      { conversation_id: 6, sender_type: "User", sender_id: 5, channel: "whatsapp", content: "Te explico…", created_at: new Date("2025-09-10T09:44:50Z"), updated_at: new Date("2025-09-10T09:44:50Z") },

      // -------------------------
      // CONVERSACIÓN 7 (solo 1 mensaje)
      // -------------------------
      { conversation_id: 7, sender_type: "Contact", sender_id: 3, channel: "email", content: "Recibí el mail, gracias.", created_at: new Date("2025-10-19T18:12:33Z"), updated_at: new Date("2025-10-19T18:12:33Z") },

      // -------------------------
      // CONVERSACIÓN 8
      // -------------------------
      { conversation_id: 8, sender_type: "User", sender_id: 4, channel: "whatsapp", content: "Estoy revisando tu consulta.", created_at: new Date("2025-11-08T20:10:00Z"), updated_at: new Date("2025-11-08T20:10:00Z") },
      { conversation_id: 8, sender_type: "Contact", sender_id: 3, channel: "whatsapp", content: "Gracias por avisar.", created_at: new Date("2025-11-08T20:40:22Z"), updated_at: new Date("2025-11-08T20:40:22Z") },
      { conversation_id: 8, sender_type: "User", sender_id: 1, channel: "whatsapp", content: "Ya casi lo tengo.", created_at: new Date("2025-11-08T21:00:55Z"), updated_at: new Date("2025-11-08T21:00:55Z") },
      { conversation_id: 8, sender_type: "Contact", sender_id: 3, channel: "whatsapp", content: "Genial!", created_at: new Date("2025-11-08T21:05:18Z"), updated_at: new Date("2025-11-08T21:05:18Z") },

      // -------------------------
      // CONVERSACIÓN 9 (solo 1 mensaje)
      // -------------------------
      { conversation_id: 9, sender_type: "User", sender_id: 2, channel: "email", content: "Te envié la actualización.", created_at: new Date("2025-11-26T12:45:10Z"), updated_at: new Date("2025-11-26T12:45:10Z") },

      // -------------------------
      // CONVERSACIÓN 10
      // -------------------------
      { conversation_id: 10, sender_type: "Contact", sender_id: 4, channel: "whatsapp", content: "¿Hay novedades?", created_at: new Date("2025-09-14T13:20:00Z"), updated_at: new Date("2025-09-14T13:20:00Z") },
      { conversation_id: 10, sender_type: "User", sender_id: 5, channel: "whatsapp", content: "Todavía no, pero te aviso.", created_at: new Date("2025-09-14T14:11:55Z"), updated_at: new Date("2025-09-14T14:11:55Z") },

      // -------------------------
      // CONVERSACIÓN 11 (solo 1 mensaje)
      // -------------------------
      { conversation_id: 11, sender_type: "Contact", sender_id: 5, channel: "email", content: "Ahi revisé el adjunto, gracias.", created_at: new Date("2025-09-30T17:29:33Z"), updated_at: new Date("2025-09-30T17:29:33Z") },

      // -------------------------
      // CONVERSACIÓN 12
      // -------------------------
      { conversation_id: 12, sender_type: "User", sender_id: 4, channel: "whatsapp", content: "¿Pudiste probarlo?", created_at: new Date("2025-10-12T10:40:00Z"), updated_at: new Date("2025-10-12T10:40:00Z") },
      { conversation_id: 12, sender_type: "Contact", sender_id: 5, channel: "whatsapp", content: "Recién lo hago.", created_at: new Date("2025-10-12T11:10:12Z"), updated_at: new Date("2025-10-12T11:10:12Z") },
      { conversation_id: 12, sender_type: "User", sender_id: 3, channel: "whatsapp", content: "Cualquier error me decís.", created_at: new Date("2025-10-12T11:22:41Z"), updated_at: new Date("2025-10-12T11:22:41Z") },

      // -------------------------
      // CONVERSACIÓN 13
      // -------------------------
      { conversation_id: 13, sender_type: "Contact", sender_id: 5, channel: "whatsapp", content: "Hola!", created_at: new Date("2025-11-18T18:40:20Z"), updated_at: new Date("2025-11-18T18:40:20Z") },
      { conversation_id: 13, sender_type: "User", sender_id: 1, channel: "whatsapp", content: "Hola! ¿Qué tal?", created_at: new Date("2025-11-18T19:00:00Z"), updated_at: new Date("2025-11-18T19:00:00Z") },
      { conversation_id: 13, sender_type: "Contact", sender_id: 5, channel: "whatsapp", content: "Tengo una consulta técnica.", created_at: new Date("2025-11-18T19:40:13Z"), updated_at: new Date("2025-11-18T19:40:13Z") },
      { conversation_id: 13, sender_type: "User", sender_id: 4, channel: "whatsapp", content: "Te escucho.", created_at: new Date("2025-11-18T19:55:13Z"), updated_at: new Date("2025-11-18T19:55:13Z") },

      // -------------------------
      // CONVERSACIÓN 14 (solo 1 mensaje)
      // -------------------------
      { conversation_id: 14, sender_type: "Contact", sender_id: 6, channel: "whatsapp", content: "¿Seguimos en contacto?", created_at: new Date("2025-09-05T12:10:22Z"), updated_at: new Date("2025-09-05T12:10:22Z") },

      // -------------------------
      // CONVERSACIÓN 15
      // -------------------------
      { conversation_id: 15, sender_type: "User", sender_id: 2, channel: "email", content: "Te envié el detalle.", created_at: new Date("2025-10-07T19:50:00Z"), updated_at: new Date("2025-10-07T19:50:00Z") },
      { conversation_id: 15, sender_type: "Contact", sender_id: 6, channel: "email",content: "Lo vi, gracias.", created_at: new Date("2025-10-07T20:44:55Z"), updated_at: new Date("2025-10-07T20:44:55Z") },

      // -------------------------
      // CONVERSACIÓN 16
      // -------------------------
      { conversation_id: 16, sender_type: "Contact", sender_id: 6, channel: "whatsapp", content: "Avisame cuando esté.", created_at: new Date("2025-11-11T08:50:00Z"), updated_at: new Date("2025-11-11T08:50:00Z") },
      { conversation_id: 16, sender_type: "User", sender_id: 1, channel: "whatsapp", content: "Dale, en un rato te mando.", created_at: new Date("2025-11-11T09:32:11Z"), updated_at: new Date("2025-11-11T09:32:11Z") },

      // -------------------------
      // CONVERSACIÓN 17 (solo 1 mensaje)
      // -------------------------
      { conversation_id: 17, sender_type: "User", sender_id: 5, channel: "email", content: "Perfecto, tomamos nota.", created_at: new Date("2025-11-27T22:55:33Z"), updated_at: new Date("2025-11-27T22:55:33Z") }



    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('messages', null, {});
  }
};
