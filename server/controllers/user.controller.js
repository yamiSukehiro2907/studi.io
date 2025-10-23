const uploadprofileImageCloudinary = require("../config/cloudinary.config");
const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");

const updateUser = async (req, res) => {
  try {
    const { name, username, bio } = req.body;
    if (!name && !username && !bio && !req.file) {
      return res
        .status(400)
        .json({ message: "At least one field is required to update" });
    }
    let user = req.user;
    if (!user) return res.status(404).json({ message: "User not found" });
    if (username) {
      const usernameExists = await User.findOne({
        username: username,
        _id: { $ne: user._id },
      });
      if (usernameExists)
        return res.status(409).json({ message: "Username is already in use" });
      user.username = username;
    }
    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (req.file) {
      try {
        user.profileImage = await uploadprofileImageCloudinary(req.file.path);
      } catch (uploadError) {
        return res.status(500).json({
          message: "Failed to upload image",
          error: uploadError.message,
        });
      }
    }

    await user.save();
    return res.status(200).json({
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio,
      profileImage: user.profileImage,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    let user = await User.findById(userId).select("-password -refreshToken");
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({email: email});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password field is required" });
    }
    let hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { updateUser, getProfile, changePassword };
