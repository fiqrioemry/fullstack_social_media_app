"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Comments", [
      {
        id: 1,
        userId: 2,
        postId: 1,
        commentId: null,
        comment: "Betul sekali memang enak bro",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        userId: 3,
        postId: 1,
        commentId: null,
        comment: "Makan dimana emangnya bang ?",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        userId: 1,
        postId: 1,
        commentId: 2,
        comment: "pas jalan ke bukit tinggi, ada yang jual samping jalan",
        createdAt: "2024-12-20 10:28:51",
        updatedAt: "2024-12-20 10:28:51",
      },
      {
        id: 4,
        userId: 1,
        postId: 4,
        commentId: null,
        comment: "Siapa yang menang bro ?",
        createdAt: "2024-12-20 10:29:42",
        updatedAt: "2024-12-20 10:29:42",
      },
      {
        id: 5,
        userId: 2,
        postId: 4,
        commentId: 4,
        comment: "yang menang indonesia, skornya 5-1",
        createdAt: "2024-12-20 10:30:13",
        updatedAt: "2024-12-20 10:30:13",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Comments", null, {});
  },
};
