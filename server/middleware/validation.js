const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();
const validate = async (req, res, next) => {
  if (!req.cookies) {
    return res.status(400).json({ message: "Token not provided" });
  }
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(400).json({ message: "Token not provided" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res
        .status(409)
        .json({ message: "Please verify your email first" });
    }
    req.user = user;
    next();
  });
};

module.exports = validate;
