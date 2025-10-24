const cloudinary = require("cloudinary").v2;
const fs = require("fs");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadprofileImageCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "profile_images",
        resource_type: "auto",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    if (file.buffer) {
      const bufferStream = require("stream").Readable.from(file.buffer);
      bufferStream.pipe(uploadStream);
    }
    else if (file.path) {
      require("fs").createReadStream(file.path).pipe(uploadStream);
    }
  });
};

module.exports = uploadprofileImageCloudinary;
