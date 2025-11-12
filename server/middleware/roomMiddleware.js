const StudyRoom = require("../models/studyRoom.model.js");
const mongoose = require('mongoose')
const validateRoom = async (req, res, next) => {
  const roomId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    return res.status(400).json({ message: "Invalid Room ID format" });
  }
  try {
    const room = await StudyRoom.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    req.room = room;
    next();
  } catch (error) {
    console.error("Error validating room: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = validateRoom;
