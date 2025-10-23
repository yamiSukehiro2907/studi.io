const express = require("express");
const upload = require("../config/multer");
const { updateUser } = require("../controllers/user.controller");
const validate = require("../middleware/validation");

const router = express.Router();

router.post("/update", validate, upload.single("profileImage"), updateUser);

module.exports = router;
