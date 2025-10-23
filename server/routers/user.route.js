const express = require("express");
const upload = require("../config/multer");
const { updateUser , getProfile, changePassword} = require("../controllers/user.controller");
const validate = require("../middleware/validation");

const router = express.Router();

router.post("/update", validate, upload.single("profileImage"), updateUser);
router.get('/profile' , validate , getProfile)
router.post("/change-password" , changePassword)
module.exports = router;
