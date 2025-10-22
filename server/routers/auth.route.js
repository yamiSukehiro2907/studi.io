const express = require("express");
const router = express.Router();
const { signUp } = require("../controllers/auth.controller.js");

router.post("/register", signUp);

module.exports = router;
