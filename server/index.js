const express = require("express");
const cors = require("cors");
const connectMongoDB = require("./config/mongoDB.config.js");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

const PORT = process.env.PORT || 8000;

app.use("/auth", require("./routers/auth.route.js"));

app.use("/user", require("./routers/user.route.js"));

app.use("/otp", require("./routers/otp.route.js"));

app.use("/rooms", require("./routers/room.route.js"));

app.listen(PORT, async () => {
  await connectMongoDB();
  console.log(`Server is running at ${PORT}`);
});
