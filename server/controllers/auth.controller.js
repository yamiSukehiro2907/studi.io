const User = require("../models/user.model.js");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUsername } = require("../constants/username.create.js");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../constants/token.js");

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
      username: await createUsername(6),
    });
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return res
        .status(400)
        .json({ message: "Email and password fields are required" });
    }
    let user;
    if (validator.isEmail(identifier)) {
      user = await User.findOne({ email: identifier });
    } else {
      user = await User.findOne({ username: identifier });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password should be at least 6 characters long" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      return res.status(401).json({ message: "Password is incorrect" });
    }
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    console.log("Passed");
    user.refreshToken = refreshToken;
    await user.save();
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 3600000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 604800000,
    });
    return res.status(200).json({
      userId: user._id,
      email: user.email,
      username: user.username,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logOut = async (req, res) => {
  try {
    let user;
    if (req.cookies) {
      const token = req.cookies.accessToken;
      if (token) {
        res.clearCookie("accessToken");
        if (req.cookies.refreshToken) res.clearCookie("refreshToken");
        jwt.verify(
          token,
          process.env.ACCESS_TOKEN_SECRET,
          async (err, decoded) => {
            if (decoded) {
              let id = decoded.id;
              user = await User.findById(id);
              if (user) {
                user.refreshToken = "";
                await user.save();
              }
            }
          }
        );
      }
    }
    return res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signUp, login, logOut };
