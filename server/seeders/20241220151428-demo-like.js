"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Likes", [
      {
        id: 1,
        userId: 3,
        entityId: 1,
        entityType: "post",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        userId: 4,
        entityId: 1,
        entityType: "post",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        userId: 3,
        entityId: 1,
        entityType: "comment",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        userId: 4,
        entityId: 1,
        entityType: "comment",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        userId: 4,
        entityId: 1,
        entityType: "reply",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Likes", null, {});
  },
};
