'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('conversations', [
      {
        contact_id: 1,
        status: false,
        channel: 'whatsapp',
        created_at: new Date,
        updated_at: new Date
      },
      {
        contact_id: 2,
        status: true,
        channel: 'email',
        last_interaction: new Date,
        created_at: new Date,
        updated_at: new Date
      },
      {
        contact_id: 3,
        status: false,
        channel: 'whatsapp',
        created_at: new Date,
        updated_at: new Date
      },
      {
        contact_id: 2,
        status: true,
        channel: 'email',
        last_interaction: new Date,
        created_at: new Date,
        updated_at: new Date
      },
      {
        contact_id: 4,
        status: true,
        channel: 'whatsapp',
        last_interaction: new Date,
        created_at: new Date,
        updated_at: new Date
      },
      {
        contact_id: 1,
        status: true,
        channel: 'email',
        last_interaction: new Date,
        created_at: new Date,
        updated_at: new Date
      },
      {
        contact_id: 3,
        status: false,
        channel: 'email',
        last_interaction: new Date,
        created_at: new Date,
        updated_at: new Date
      },
      {
        contact_id: 1,
        status: true,
        channel: 'email',
        last_interaction: new Date,
        created_at: new Date,
        updated_at: new Date
      },
      {
        contact_id: 3,
        status: true,
        channel: 'whatsapp',
        last_interaction: new Date,
        created_at: new Date,
        updated_at: new Date
      },
      {
        contact_id: 3,
        status: true,
        channel: 'whatsapp',
        created_at: new Date,
        updated_at: new Date
      },
      {
        contact_id: 5,
        status: false,
        channel: 'whatsapp',
        created_at: new Date,
        updated_at: new Date
      },
      {
        contact_id: 6,
        status: false,
        channel: 'whatsapp',
        last_interaction: new Date,
        created_at: new Date,
        updated_at: new Date
      },
      
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('conversations', null, {});
  }
};
