const express = require("express");
const validate = require("../middleware/validation");
const {
  createStudyRoom,
  getAllRooms,
  getRoomInfo,
  joinPublicRoom,
} = require("../controllers/studyroom.controller");

const router = express.Router();

router.post("/create", validate, createStudyRoom);

router.get("/", validate, getAllRooms);

router.get("/:id", getRoomInfo);

router.post("/join/:id", validate, joinPublicRoom);

module.exports = router;
