'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('a12s3d4f5g', 10);
    const hashedPass = await bcrypt.hash('12345', 10);

    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        username: 'johndoe',
        email: 'johndoe@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        username: 'janedoe',
        email: 'janedoe@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        username: 'michael92',
        email: 'michael92@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        username: 'emilybrown',
        email: 'emilybrown@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        username: 'david_smith',
        email: 'david.smith@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        username: 'sarahjones',
        email: 'sarahjones@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        username: 'chriswilliams',
        email: 'chriswilliams@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        username: 'olivia_martin',
        email: 'olivia.martin@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        username: 'daniel_taylor',
        email: 'daniel.taylor@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        username: 'sophia_anderson',
        email: 'sophia.anderson@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        username: 'michael_jackson99',
        email: 'demo.account@gmail.com',
        password: hashedPass,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
