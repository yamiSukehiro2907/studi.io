const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const cookieParser = require("cookie-parser");
const connectMongoDB = require("./config/mongoDB.config.js");
const setupSocketHandlers = require("./handler/socketHandler.js");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173"];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
app.use("/messages", require("./routers/message.route.js"));

setupSocketHandlers(io);

server.listen(PORT, async () => {
  await connectMongoDB();
  console.log(`Server is running at ${PORT}`);
});
