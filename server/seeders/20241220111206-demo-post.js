'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Posts', [
      {
        id: 1,
        userId: 1, // Random 1-5
        content: 'Enjoying a warm cup of coffee while watching the sunset.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        userId: 2,
        content:
          'Learning JavaScript is fun, especially when building projects.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        userId: 3,
        content:
          'Hiking through the mountains was an unforgettable experience!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        userId: 4,
        content: 'Reading books is a great way to escape reality for a while.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        userId: 5,
        content: 'Cooking homemade pasta today! Wish me luck!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        userId: 1,
        content: 'Attending a tech conference this weekend. Super excited!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        userId: 2,
        content:
          'Just watched an amazing movie! Highly recommend it. Captain America brave new world is so excited to see.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        userId: 3,
        content:
          "Trying out a new gym routine. Let's see how long I last! Today is a Leg day. gotta push it hard !!!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        userId: 4,
        content: 'A road trip with friends is always a great idea.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        userId: 5,
        content: 'Finally finished my project! Time to celebrate!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 11,
        userId: 4,
        content:
          "The government's new sports funding policy is great! More investment in young athletes is always a win. 🏆",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        userId: 1,
        content:
          'Inflation is affecting ticket prices for major sports events. Will we see fewer fans in stadiums this year? 🤔',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 13,
        userId: 2,
        content:
          'A strong economy leads to better sports infrastructure. Excited to see how this impacts our national teams! ⚽🏀',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 14,
        userId: 2,
        content:
          'Should governments subsidize local sports clubs? It could boost young talent but also increase public spending. 🤷‍♂️',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 15,
        userId: 3,
        content:
          'With the economy slowing down, should cities still invest in hosting international sports events? Huge debate! 📊⚡',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 16,
        userId: 2,
        content:
          'Just finished watching the latest blockbuster movie! The cinematography was absolutely stunning. 🎬🍿',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 17,
        userId: 4,
        content:
          "A famous music artist just announced a world tour! Can't wait to grab tickets. 🎤🎶",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 18,
        userId: 2,
        content:
          'Breaking news: The stock market took a sharp dip today, raising concerns about economic stability. 📉',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 19,
        userId: 1,
        content:
          'A major breakthrough in medical science! Scientists have developed a new treatment for a rare disease. 🏥💡',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 20,
        userId: 5,
        content:
          'Severe weather alert issued for the weekend. Stay safe and follow updates from local authorities! 🌪️⚠️',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
  },
};
