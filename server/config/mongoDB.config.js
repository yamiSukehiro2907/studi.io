const mongoose = require("mongoose");
require("dotenv").config();

const connectMongoDB = async (req, res) => {
  console.log("Trying to connect to MongoDB database...");
  try {
    const connection = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      "MongoDB database connected: ",
      connection.connection.host,
      connection.connection.name
    );
  } catch (error) {
    console.log("Error connecting to mongoDB database: ", error);
    process.exit(1);
  }
};
module.exports = connectMongoDB;
