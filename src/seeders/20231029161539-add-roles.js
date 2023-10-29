'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:*/
      await queryInterface.bulkInsert('Roles', [
      {
        name: 'ADMIN',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : 'Customer',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : 'AIRLINE_BUSINESS',
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
