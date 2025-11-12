const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");
const {
  createStudyRoom,
  getAllRooms,
  getRoomInfo,
  joinPublicRoom,
  getPublicRoom,
  updateRoomInfo,
  deleteRoom,
} = require("../controllers/studyroom.controller");
const upload = require("../config/multer");
const sectionRoutes = require("./section.route.js");
const validateRoom = require("../middleware/roomMiddleware.js");

const router = express.Router();

router.use(authMiddleware);

router.get("/public", getPublicRoom);

router.post("/create", createStudyRoom);

router.get("/", getAllRooms);

router.use("/:id/sections", validateRoom, sectionRoutes);

router.get("/:id", getRoomInfo);

router.post("/:id/join", validateRoom, joinPublicRoom);

router.put(
  "/:id/update",
  validateRoom,
  upload.single("roomImage"),
  updateRoomInfo
);

router.delete("/:id", validateRoom, deleteRoom);

module.exports = router;
