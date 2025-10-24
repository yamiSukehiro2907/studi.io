const express = require("express");
const validate = require("../middleware/validation");
const { getMessagesForRoom } = require("../controllers/message.controller");

const router = express.Router();

router.get("/:id", validate, getMessagesForRoom);

module.exports = router;