const User = require("../models/user.model.js");
const validator = require("validator");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../config/token.js");

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name and Email fields are required." });
    }
    if (name.trim() == "") {
      return res.status(400).json({ message: "Name should not be empty" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email format is invalid" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password should be at least 6 characters long" });
    }
    let alreadyExists = await User.findOne({ email: email });
    if (alreadyExists) {
      return res.status(401).json({ message: "Email already in use" });
    }
    let hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password fields are required" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email has invalid format" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password should be at least 6 characters long" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      return res.status(401).json({ message: "Password is incorrect" });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    return res.status(200).json({
      userId: user._id,
      email: user.email,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signUp, login };
