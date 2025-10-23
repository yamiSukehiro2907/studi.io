const cloudinary = require("cloudinary").v2;
const fs = require("fs");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadprofileImageCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      throw new Error("No local file path provided");
    }

    if (!fs.existsSync(localFilePath)) {
      throw new Error("File not found: " + localFilePath);
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "profile_pictures",
    });

    fs.unlinkSync(localFilePath);

    return response.secure_url;
  } catch (err) {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
  }
};

module.exports = uploadprofileImageCloudinary;
