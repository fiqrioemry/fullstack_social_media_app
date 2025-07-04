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
        username: 'johntravolta',
        email: 'johntravolta@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        username: 'janedoe43',
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
        username: 'emilybrown33',
        email: 'emilybrown@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        username: 'david_smith12',
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
        username: 'olivia_martinx9',
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
        email: 'demo.account@example.com',
        password: hashedPass,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        username: 'emma_wilson1',
        email: 'emma.wilson@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 13,
        username: 'liam_thomas',
        email: 'liam.thomas@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 14,
        username: 'noah_james',
        email: 'noah.james@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 15,
        username: 'ava_lee98',
        email: 'ava.lee@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 16,
        username: 'isabella_clark',
        email: 'isabella.clark@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 17,
        username: 'logan_white',
        email: 'logan.white@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 18,
        username: 'lucas_greenx',
        email: 'lucas.green@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 19,
        username: 'mia_hallucinate',
        email: 'mia.hall@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 20,
        username: 'ethan_wright',
        email: 'ethan.wright@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
