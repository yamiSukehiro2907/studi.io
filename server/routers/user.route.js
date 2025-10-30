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

router.use(authMiddleware)

router.put("/update", upload.single("profileImage"), updateUser);
router.get("/profile", getProfile);
router.put("/change-password", changePassword);
router.put(
  "/change-password-with-current",
  changePasswordWithCurrent
);
module.exports = router;
