const express = require("express");
const upload = require("../config/multer");
const {
  updateUser,
  getProfile,
  changePassword,
  changePasswordWithCurrent,
} = require("../controllers/user.controller");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/update", authMiddleware, upload.single("profileImage"), updateUser);
router.get("/profile", authMiddleware, getProfile);
router.post("/change-password", changePassword);
router.post(
  "/change-password-with-current",
  authMiddleware,
  changePasswordWithCurrent
);
module.exports = router;
