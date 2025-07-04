// scripts/init-mongo.js
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const ADMIN_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";

const main = async () => {
  const client = new MongoClient(ADMIN_URI);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const admin = client.db().admin();
    const { databases } = await admin.listDatabases();

    const dbExists = databases.some(
      (db) => db.name === process.env.DB_DATABASE
    );

    if (dbExists) {
      await client.db(process.env.DB_DATABASE).dropDatabase();
      console.log(`🗑️ Dropped existing database '${process.env.DB_DATABASE}'`);
    }

    await client.db(process.env.DB_DATABASE).createCollection("Message");
    console.log(
      `✅ Created new database '${process.env.DB_DATABASE}' with collection 'Message'`
    );
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
  }
};

main();
