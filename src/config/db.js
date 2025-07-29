const mongoose = require("mongoose");

const connectDB = async (dbName = "BoneData") => {
  try {
    const conn = await mongoose
      .createConnection(process.env.MONGO_URI, {
        dbName,
      })
      .asPromise();

    console.log(`🟢 Connected to MongoDB [${dbName}]`);
    return conn;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    throw err;
  }
};

module.exports = connectDB;
