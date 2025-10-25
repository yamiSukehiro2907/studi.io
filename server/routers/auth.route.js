const express = require("express");
const router = express.Router();
const { signUp, login, logOut, refresh } = require("../controllers/auth.controller.js");

router.post("/register", signUp);
router.post("/login", login);
router.post("/logout", logOut);
router.post("/refresh" , refresh)

module.exports = router;
