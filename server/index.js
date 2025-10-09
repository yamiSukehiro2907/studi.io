const express = require("express");
const connectMongoDB = require("./config/mongoDB.config.js");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8000;

app.get("/", async (req, res) => {
  return res.status(200).json({
    message: "Server started successfully",
  });
});

app.listen(PORT, async () => {
  await connectMongoDB();
  console.log(`Server is running at ${PORT}`);
});
