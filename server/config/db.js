const mongoose = require("mongoose");

const {
  MONGODB_USERNAME = "",
  MONGODB_PASSWORD = "",
  MONGODB_NAME = "",
} = process.env;

const connectToMongoDB = async () => {
  try {
    const uri = `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@ac-b52oikv-shard-00-00.d7jpm2p.mongodb.net:27017,ac-b52oikv-shard-00-01.d7jpm2p.mongodb.net:27017,ac-b52oikv-shard-00-02.d7jpm2p.mongodb.net:27017/?ssl=true&replicaSet=atlas-11fb9i-shard-0&authSource=admin&appName=Cluster0`;

    await mongoose.connect(uri, {
      dbName: MONGODB_NAME,
    });

    console.log("You successfully connected to MongoDB via Mongoose!");
    return mongoose;
  } catch (err) {
    console.error("Mongoose connection error:", err);
  }
};
const disconnectFromMongoDB = async () => {
  await mongoose.connection.close();
};

module.exports = { connectToMongoDB, disconnectFromMongoDB };
