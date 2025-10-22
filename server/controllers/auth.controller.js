const User = require("../models/user.model.js");
const validator = require("validator");
const bcrypt = require("bcrypt");

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
    if (!email && !password) {
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
    const user = await User.find({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const passwordMatched = bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      return res.status(401).json({ message: "Password is incorrect" });
    }
    
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signUp };
