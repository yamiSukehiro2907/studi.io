const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateAccessToken = (id) => {
  return jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
  });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id: id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
  });
};

module.exports = { generateAccessToken, generateRefreshToken };
