const express = require("express");
const validate = require("../middleware/validation");
const {
  createStudyRoom,
  getAllRooms,
  getRoomInfo,
  joinPublicRoom,
  getPublicRoom,
  updateRoomInfo,
} = require("../controllers/studyroom.controller");
const upload = require("../config/multer");

const router = express.Router();

router.post("/create", validate, createStudyRoom);

router.get("/", validate, getAllRooms);

router.get("/public", validate, getPublicRoom);

router.get("/:id", validate, getRoomInfo);

router.post("/join/:id", validate, joinPublicRoom);

router.post(
  "/update/:id",
  validate,
  upload.single("roomImage"),
  updateRoomInfo
);

module.exports = router;
