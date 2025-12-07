'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('templates', [
      // USER 1
      {
        user_id: 1,
        title: "Confirmar propuesta",
        channel: "whatsapp",
        content: "Hola, ¿podemos avanzar con la propuesta enviada?",
        status: true,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 1,
        title: "Recordatorio de reunión",
        channel: "email",
        content: "Te recuerdo la reunión pautada para mañana a las 10 AM.",
        status: false,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 1,
        title: "Seguimiento de cotización",
        channel: "whatsapp",
        content: "¿Tuviste oportunidad de revisar la cotización que envié?",
        status: true,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 1,
        title: "Confirmación de datos",
        channel: "email",
        content: "Necesito confirmar algunos datos antes de avanzar.",
        status: false,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 1,
        title: "Agradecimiento",
        channel: "whatsapp",
        content: "¡Gracias por tu interés! Estoy para ayudarte en lo que necesites.",
        status: true,
        created_at: new Date,
        updated_at: new Date
      },

      // USER 2
      {
        user_id: 2,
        title: "Enviar documento",
        channel: "email",
        content: "Adjunto el informe solicitado.",
        status: true,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 2,
        title: "Consultar disponibilidad",
        channel: "whatsapp",
        content: "¿Tenés disponibilidad para una llamada esta semana?",
        status: false,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 2,
        title: "Recordatorio pendiente",
        channel: "email",
        content: "Aún tenemos un pendiente por resolver. ¿Podemos verlo hoy?",
        status: true,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 2,
        title: "Enviar propuesta actualizada",
        channel: "whatsapp",
        content: "Ya tengo la propuesta con las modificaciones solicitadas.",
        status: true,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 2,
        title: "Confirmar reunión",
        channel: "email",
        content: "¿Te queda bien reagendar la reunión para el miércoles?",
        status: false,
        created_at: new Date,
        updated_at: new Date
      },

      // USER 3
      {
        user_id: 3,
        title: "Bienvenida",
        channel: "email",
        content: "Bienvenido, gracias por comunicarte con nosotros.",
        status: true,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 3,
        title: "Enviar link de acceso",
        channel: "whatsapp",
        content: "Aquí tenés el link de acceso solicitado.",
        status: true,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 3,
        title: "Seguir conversación",
        channel: "email",
        content: "¿Tenés alguna consulta sobre lo que charlamos anteriormente?",
        status: false,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 3,
        title: "Confirmar registro",
        channel: "whatsapp",
        content: "Tu registro fue recibido correctamente.",
        status: true,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 3,
        title: "Información adicional",
        channel: "email",
        content: "Te envío la información adicional que pediste.",
        status: false,
        created_at: new Date,
        updated_at: new Date
      },

      // USER 4
      {
        user_id: 4,
        title: "Cierre de mes",
        channel: "email",
        content: "Necesito el reporte final para el cierre del mes.",
        status: true,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 4,
        title: "Actualización de estado",
        channel: "whatsapp",
        content: "¿Alguna novedad sobre el avance?",
        status: true,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 4,
        title: "Solicitud de datos",
        channel: "email",
        content: "Podrías enviarme el archivo actualizado, por favor.",
        status: false,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 4,
        title: "Agenda disponible",
        channel: "whatsapp",
        content: "Tengo disponibilidad para una reunión hoy por la tarde.",
        status: true,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 4,
        title: "Revisión pendiente",
        channel: "email",
        content: "Quedó una revisión pendiente en el último envío.",
        status: false,
        created_at: new Date,
        updated_at: new Date
      },

      // USER 5
      {
        user_id: 5,
        title: "Invitación a reunión",
        channel: "email",
        content: "Te invito a participar de la reunión introductoria.",
        status: true,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 5,
        title: "Recordatorio",
        channel: "whatsapp",
        content: "Solo te recuerdo el compromiso pactado para mañana.",
        status: false,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 5,
        title: "Envío de documentación",
        channel: "email",
        content: "Adjunto la documentación pendiente.",
        status: true,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 5,
        title: "Confirmación",
        channel: "whatsapp",
        content: "Tu solicitud fue confirmada exitosamente.",
        status: true,
        created_at: new Date,
        updated_at: new Date
      },
      {
        user_id: 5,
        title: "Seguimiento",
        channel: "email",
        content: "¿Querés que sigamos con el siguiente paso?",
        status: false,
        created_at: new Date,
        updated_at: new Date
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('templates', null, {});
  }
};
