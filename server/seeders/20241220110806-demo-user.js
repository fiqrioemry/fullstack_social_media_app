"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("12345", 10);

    await queryInterface.bulkInsert("Users", [
      {
        id: 1,
        username: "fiqrioemry99",
        email: "fiqrioemry@gmail.com",
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        username: "appleuser01",
        email: "appleuser01@gmail.com",
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        username: "bananauser01",
        email: "bananauser01@gmail.com",
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        username: "coconutauser01",
        email: "coconutuser01@gmail.com",
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
