const User = require("../models/user.model.js");

const createUsername = async (length) => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let username = "";
  username += chars.charAt(Math.floor(Math.random() * 26));
  for (let i = 1; i < length; i++) username += chars.charAt(Math.floor(Math.random() * chars.length));
  const usernameAlreadyExists = await User.findOne({ username: username });
  if (usernameAlreadyExists) return createUsername(length);
  return username;
};

module.exports = {createUsername};
