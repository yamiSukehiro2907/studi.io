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
      return res.status(409).json({ message: "Email already in use" });
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

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password should be at least 6 characters long" });
    }

    let user;
    if (validator.isEmail(identifier)) {
      user = await User.findOne({ email: identifier });
    } else {
      user = await User.findOne({ username: identifier });
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    const isProduction = process.env.NODE_ENV === "production";

    const cookieOptions = {
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
    };

    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 3600000,
    });

    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 604800000,
    });

    return res.status(200).json({
      userId: user._id,
      email: user.email,
      username: user.username,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logOut = async (req, res) => {
  try {
    const token = req.cookies?.accessToken;

    if (token) {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");

      try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (decoded && decoded.id) {
          const user = await User.findById(decoded.id);
          if (user) {
            user.refreshToken = "";
            await user.save();
          }
        }
      } catch (err) {
        console.log("Token verification failed during logout:", err);
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

const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(400).json({ message: "No refreshToken provided" });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Invalid or expired token" });
        }

        try {

          console.log(decoded)

          let userId = decoded.id;
          let user = await User.findById(userId);

          console.log(user)

          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }

          const newAccessToken = generateAccessToken(userId);
          let newRefreshToken = generateRefreshToken(userId);
          user.refreshToken = newRefreshToken;

          await user.save();
          const isProduction = process.env.NODE_ENV === "production";

          const cookieOptions = {
            httpOnly: true,
            sameSite: isProduction ? "none" : "lax",
            secure: isProduction,
          };

          res.cookie("accessToken", newAccessToken, {
            ...cookieOptions,
            maxAge: 3600000,
          });

          res.cookie("refreshToken", newRefreshToken, {
            ...cookieOptions,
            maxAge: 604800000,
          });

          return res
            .status(200)
            .json({ message: "User tokens refreshed successfully" });
        } catch (error) {
          console.error("Error in refresh callback:", error);
          return res.status(500).json({ message: "Internal server error" });
        }
      }
    );
  } catch (error) {
    console.error("Error refreshing tokens:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signUp, login, logOut, refresh };
