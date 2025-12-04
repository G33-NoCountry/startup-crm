'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('conversations', [
      {
        contact_id: 1,
        status: false,
        channel: 'whatsapp',
        last_interaction: new Date("2025-09-07T14:18:10Z"),
        created_at: new Date("2025-09-07T13:45:00Z"),
        updated_at: new Date("2025-09-07T14:18:10Z")
      },
      {
        contact_id: 1,
        status: true,
        channel: 'email',
        last_interaction: new Date("2025-10-03T10:55:40Z"),
        created_at: new Date("2025-10-03T09:20:00Z"),
        updated_at: new Date("2025-10-03T10:55:40Z")
      },
      {
        contact_id: 1,
        status: false,
        channel: 'whatsapp',
        last_interaction: new Date("2025-11-15T18:30:55Z"),
        created_at: new Date("2025-11-15T17:00:40Z"),
        updated_at: new Date("2025-11-15T18:30:55Z")
      },

      // CONTACTO 2 (2 conversaciones)
      {
        contact_id: 2,
        status: true,
        channel: 'whatsapp',
        last_interaction: new Date("2025-09-22T11:25:10Z"),
        created_at: new Date("2025-09-22T10:40:00Z"),
        updated_at: new Date("2025-09-22T11:25:10Z")
      },
      {
        contact_id: 2,
        status: false,
        channel: 'email',
        last_interaction: new Date("2025-11-02T16:59:22Z"),
        created_at: new Date("2025-11-02T15:05:11Z"),
        updated_at: new Date("2025-11-02T16:59:22Z")
      },

      // CONTACTO 3 (4 conversaciones)
      {
        contact_id: 3,
        status: true,
        channel: 'whatsapp',
        last_interaction: new Date("2025-09-10T09:44:50Z"),
        created_at: new Date("2025-09-10T09:00:00Z"),
        updated_at: new Date("2025-09-10T09:44:50Z")
      },
      {
        contact_id: 3,
        status: false,
        channel: 'email',
        last_interaction: new Date("2025-10-19T18:12:33Z"),
        created_at: new Date("2025-10-19T16:00:44Z"),
        updated_at: new Date("2025-10-19T18:12:33Z")
      },
      {
        contact_id: 3,
        status: true,
        channel: 'whatsapp',
        last_interaction: new Date("2025-11-08T21:05:18Z"),
        created_at: new Date("2025-11-08T20:00:00Z"),
        updated_at: new Date("2025-11-08T21:05:18Z")
      },
      {
        contact_id: 3,
        status: false,
        channel: 'email',
        last_interaction: new Date("2025-11-26T12:45:10Z"),
        created_at: new Date("2025-11-26T11:30:00Z"),
        updated_at: new Date("2025-11-26T12:45:10Z")
      },

      // CONTACTO 4 (1 conversación)
      {
        contact_id: 4,
        status: true,
        channel: 'whatsapp',
        last_interaction: new Date("2025-09-14T14:11:55Z"),
        created_at: new Date("2025-09-14T13:00:00Z"),
        updated_at: new Date("2025-09-14T14:11:55Z")
      },

      // CONTACTO 5 (3 conversaciones)
      {
        contact_id: 5,
        status: false,
        channel: 'email',
        last_interaction: new Date("2025-09-30T17:29:33Z"),
        created_at: new Date("2025-09-30T15:44:20Z"),
        updated_at: new Date("2025-09-30T17:29:33Z")
      },
      {
        contact_id: 5,
        status: true,
        channel: 'whatsapp',
        last_interaction: new Date("2025-10-12T11:22:41Z"),
        created_at: new Date("2025-10-12T10:10:00Z"),
        updated_at: new Date("2025-10-12T11:22:41Z")
      },
      {
        contact_id: 5,
        status: true,
        channel: 'whatsapp',
        last_interaction: new Date("2025-11-18T19:55:13Z"),
        created_at: new Date("2025-11-18T18:40:10Z"),
        updated_at: new Date("2025-11-18T19:55:13Z")
      },

      // CONTACTO 6 (4 conversaciones)
      {
        contact_id: 6,
        status: false,
        channel: 'whatsapp',
        last_interaction: new Date("2025-09-05T12:10:22Z"),
        created_at: new Date("2025-09-05T11:40:00Z"),
        updated_at: new Date("2025-09-05T12:10:22Z")
      },
      {
        contact_id: 6,
        status: true,
        channel: 'email',
        last_interaction: new Date("2025-10-07T20:44:55Z"),
        created_at: new Date("2025-10-07T19:20:00Z"),
        updated_at: new Date("2025-10-07T20:44:55Z")
      },
      {
        contact_id: 6,
        status: false,
        channel: 'whatsapp',
        last_interaction: new Date("2025-11-11T09:32:11Z"),
        created_at: new Date("2025-11-11T08:10:40Z"),
        updated_at: new Date("2025-11-11T09:32:11Z")
      },
      {
        contact_id: 6,
        status: true,
        channel: 'email',
        last_interaction: new Date("2025-11-27T22:55:33Z"),
        created_at: new Date("2025-11-27T21:45:00Z"),
        updated_at: new Date("2025-11-27T22:55:33Z")
      },

      // CONTACTO 7 (2 conversaciones)
      {
        contact_id: 7,
        status: false,
        channel: 'whatsapp',
        last_interaction: new Date("2025-10-01T09:55:12Z"),
        created_at: new Date("2025-10-01T09:10:00Z"),
        updated_at: new Date("2025-10-01T09:55:12Z")
      },
      {
        contact_id: 7,
        status: true,
        channel: 'email',
        last_interaction: new Date("2025-11-20T14:21:40Z"),
        created_at: new Date("2025-11-20T13:00:00Z"),
        updated_at: new Date("2025-11-20T14:21:40Z")
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('conversations', null, {});
  }
};
