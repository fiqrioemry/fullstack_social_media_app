"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Follows", [
      {
        id: 1,
        followerId: 1,
        followingId: 2,
        createdAt: "2024-12-20 04:44:27",
        updatedAt: "2024-12-20 04:44:27",
      },
      {
        id: 2,
        followerId: 1,
        followingId: 3,
        createdAt: "2024-12-20 04:49:11",
        updatedAt: "2024-12-20 04:49:11",
      },
      {
        id: 3,
        followerId: 2,
        followingId: 1,
        createdAt: "2024-12-20 04:49:17",
        updatedAt: "2024-12-20 04:49:17",
      },
      {
        id: 4,
        followerId: 3,
        followingId: 2,
        createdAt: "2024-12-20 04:52:21",
        updatedAt: "2024-12-20 04:52:21",
      },
      {
        id: 5,
        followerId: 3,
        followingId: 1,
        createdAt: "2024-12-20 04:52:29",
        updatedAt: "2024-12-20 04:52:29",
      },
      {
        id: 6,
        followerId: 4,
        followingId: 1,
        createdAt: "2024-12-20 04:52:29",
        updatedAt: "2024-12-20 04:52:29",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Follows", null, {});
  },
};
