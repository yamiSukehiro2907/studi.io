const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getMessagesForRoom } = require("../controllers/message.controller");

const router = express.Router();

router.get("/:id", authMiddleware, getMessagesForRoom);

module.exports = router;