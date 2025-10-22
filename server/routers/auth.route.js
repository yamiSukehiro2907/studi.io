const express = require("express");
const router = express.Router();
const { signUp , login } = require("../controllers/auth.controller.js");

router.post("/register", signUp);
router.post("/login" , login)

module.exports = router;
