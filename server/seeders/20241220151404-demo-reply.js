"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Replies", [
      {
        id: 1,
        userId: 1,
        commentId: 2,
        content:
          "makannya dijalan padang bulan, sebelum pom bensin sebelah kiri. namanya sate padang Uda Begindo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        userId: 2,
        commentId: 3,
        content: "pemenangnya indonesia bang, hasil akhirnya 5-1. keren deh",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        userId: 3,
        commentId: 3,
        content: "hebat ya indonesia, saya ikutan bangga",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Replies", null, {});
  },
};
