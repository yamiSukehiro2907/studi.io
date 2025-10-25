const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const cookie = require("cookie");
const { promisify } = require("util");
require("dotenv").config();

const verifyToken = promisify(jwt.verify);

const authenticateSocket = async (socket, next) => {
  try {
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    const token = cookies.accessToken;

    if (!token) {
      return next(new Error("Authentication error: No token provided"));
    }

    const decoded = await verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.id).select(
      "_id name email profileImage isVerified username"
    );

    if (!user) {
      return next(new Error("Authentication error: User not found"));
    }

    if (!user.isVerified) {
      return next(
        new Error("Authentication error: Please verify your email first")
      );
    }

    socket.user = user;
    next();
  } catch (error) {
    console.error("Socket authentication error:", error);
    if (error.name === "JsonWebTokenError") {
      return next(new Error("Authentication error: Invalid token"));
    }
    if (error.name === "TokenExpiredError") {
      return next(new Error("Authentication error: Token expired"));
    }
    return next(new Error("Authentication error"));
  }
};

module.exports = authenticateSocket;
