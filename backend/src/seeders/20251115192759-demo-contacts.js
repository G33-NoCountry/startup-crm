'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('contacts', [
      {
        full_name: "Sofía Rodríguez",
        email: "sofia.rodriguez.dev@gmail.com",
        phone: "+541189215288",
        created_at: new Date,
        updated_at: new Date

      },
      {
        full_name: "Luciana Medina",
        email: "luciana@lumatech.ai",
        phone: "+541174927471",
        created_at: new Date,
        updated_at: new Date

      },
      {
        full_name: "Gabriela Prats",
        email: "g.prats@gpmarketing.co",
        created_at: new Date,
        updated_at: new Date
      },
      {
        full_name: "Sebastián Nuñez",
        email: "sebastian@nube-data.io",
        phone: "+541142521252",
        created_at: new Date,
        updated_at: new Date
      },
      {
        full_name: "Laura Benítez",
        email: "lbenitez@benitech.com",
        created_at: new Date,
        updated_at: new Date
      },
      {
        full_name: "Federico Bianchi",
        email: "f.bianchi@bianchiindustries.com",
        phone: "+541194928412",
        created_at: new Date,
        updated_at: new Date
      },
      {
        full_name: "Cristian Mena",
        email: "cmena@menalabs.io",
        created_at: new Date,
        updated_at: new Date
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('contacts', null, {});
  }
};
