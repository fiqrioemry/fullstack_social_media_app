"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("12345", 10);

    await queryInterface.bulkInsert("Profiles", [
      {
        id: 1,
        userId: 1,
        avatar: "https://api.dicebear.com/5.x/adventurer/svg?seed=Angel", // Avatar URL
        firstName: "fiqri", // Nama depan
        lastName: "oemry", // Nama belakang
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        userId: 2,
        avatar: "https://api.dicebear.com/5.x/adventurer/svg?seed=Apple", // Avatar URL
        firstName: "apple", // Nama depan
        lastName: "user", // Nama belakang
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        userId: 3,
        avatar: "https://api.dicebear.com/5.x/adventurer/svg?seed=Banana", // Avatar URL
        firstName: "banana", // Nama depan
        lastName: "user", // Nama belakang
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        userId: 4,
        avatar: "https://api.dicebear.com/5.x/adventurer/svg?seed=Coconut", // Avatar URL
        firstName: "coconut", // Nama depan
        lastName: "user", // Nama belakang
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Profiles", null, {});
  },
};
