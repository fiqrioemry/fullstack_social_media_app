// scripts/init-db.js
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const main = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: "root",
    password: process.env.DB_PASSWORD,
  });

  // DROP database (applying this because this for my private project portfolio, to make sure the VPS storage is always clean)
  await connection.query(
    `DROP DATABASE IF EXISTS \`${process.env.DB_DATABASE}\`;`
  );

  await connection.query(`CREATE DATABASE \`${process.env.DB_DATABASE}\`;`);

  await connection.end();
};

main();
