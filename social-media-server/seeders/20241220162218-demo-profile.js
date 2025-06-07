'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Profiles', [
      {
        id: 1,
        userId: 1,
        avatar: 'https://api.dicebear.com/5.x/adventurer/svg?seed=JohnDoe',
        fullname: 'John Doe',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        userId: 2,
        avatar: 'https://api.dicebear.com/5.x/adventurer/svg?seed=JaneDoe',
        fullname: 'Jane Doe',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        userId: 3,
        avatar: 'https://api.dicebear.com/5.x/adventurer/svg?seed=Michael92',
        fullname: 'Michael Johnson',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        userId: 4,
        avatar: 'https://api.dicebear.com/5.x/adventurer/svg?seed=EmilyBrown',
        fullname: 'Emily Brown',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        userId: 5,
        avatar: 'https://api.dicebear.com/5.x/adventurer/svg?seed=DavidSmith',
        fullname: 'David Smith',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        userId: 6,
        avatar: 'https://api.dicebear.com/5.x/adventurer/svg?seed=SarahJones',
        fullname: 'Sarah Jones',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        userId: 7,
        avatar:
          'https://api.dicebear.com/5.x/adventurer/svg?seed=ChrisWilliams',
        fullname: 'Chris Williams',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        userId: 8,
        avatar: 'https://api.dicebear.com/5.x/adventurer/svg?seed=OliviaMartin',
        fullname: 'Olivia Martin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        userId: 9,
        avatar: 'https://api.dicebear.com/5.x/adventurer/svg?seed=DanielTaylor',
        fullname: 'Daniel Taylor',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        userId: 10,
        avatar:
          'https://api.dicebear.com/5.x/adventurer/svg?seed=SophiaAnderson',
        fullname: 'Sophia Anderson',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        userId: 11,
        avatar:
          'https://api.dicebear.com/5.x/adventurer/svg?seed=SophiaAnderson',
        fullname: 'Michael Jackson',
        bio: 'Michael Jackson, the King of Pop, was a global icon known for his groundbreaking music, legendary dance moves, and timeless influence on pop culture. From “Thriller” to “Billie Jean,” his artistry transcended generations, inspiring millions with his voice, style, and compassion. ',
        gender: 'male',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Profiles', null, {});
  },
};
