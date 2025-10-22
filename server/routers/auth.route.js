const express = require("express");
const router = express.Router();
const { signUp, login, logOut } = require("../controllers/auth.controller.js");

router.post("/register", signUp);
router.post("/login", login);
router.post("/logout", logOut);

module.exports = router;
