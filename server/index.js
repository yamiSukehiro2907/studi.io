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

console.log("Environment ALLOWED_ORIGINS:", process.env.ALLOWED_ORIGINS);
console.log("Parsed allowedOrigins:", allowedOrigins);

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
      console.log("Request from origin:", origin);
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        console.log("Origin allowed:", origin);
        callback(null, true);
      } else {
        console.log("Origin blocked:", origin);
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

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

setupSocketHandlers(io);

server.listen(PORT, async () => {
  await connectMongoDB();
  console.log(`Server is running at ${PORT}`);
  console.log(`CORS enabled for:`, allowedOrigins);
});
