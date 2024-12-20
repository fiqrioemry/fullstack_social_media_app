"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Posts", [
      {
        id: 1,
        userId: 1,
        content:
          "Post pertama.sate padang enaknya kalau dimakan pakai kerupuk jangek",
        createdAt: "2024-12-20 05:17:42",
        updatedAt: "2024-12-20 05:17:42",
      },
      {
        id: 2,
        userId: 1,
        content:
          "Post kedua.jadi seorang software engineer itu sangatlah menyenangkan",
        createdAt: "2024-12-20 05:18:49",
        updatedAt: "2024-12-20 05:18:49",
      },
      {
        id: 3,
        userId: 2,
        content:
          "Post pertama. user apple, perjalanan menuju bukit tinggi sangatlah jauh namun pemandangannya memuaskan mata",
        createdAt: "2024-12-20 10:28:51",
        updatedAt: "2024-12-20 10:28:51",
      },
      {
        id: 4,
        userId: 2,
        content:
          "Post kedua. pertandingan bola antara indonesia vs arab sangatlah seru karena permainannya sangat sengit",
        createdAt: "2024-12-20 10:29:42",
        updatedAt: "2024-12-20 10:29:42",
      },
      {
        id: 5,
        userId: 2,
        content: "Post ketiga. Makan mie bakso malam hari pasti sangat enak",
        createdAt: "2024-12-20 10:30:13",
        updatedAt: "2024-12-20 10:30:13",
      },
      {
        id: 6,
        userId: 3,
        content: "Hari libur naik delman pergi ke kota",
        createdAt: "2024-12-20 11:02:46",
        updatedAt: "2024-12-20 11:02:46",
      },
      {
        id: 7,
        userId: 3,
        content:
          "makan soto pekalongan di jawa tengah rasanya manis. kurang pas sama lidah saya yang senang gurih",
        createdAt: "2024-12-20 11:03:20",
        updatedAt: "2024-12-20 11:03:20",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Posts", null, {});
  },
};
