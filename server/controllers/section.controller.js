const StudyRoom = require("../models/studyRoom.model.js");
const mongoose = require("mongoose");
const addSection = async (req, res) => {
  try {
    const room = req.room;
    const { title } = req.body;
    if (!mongoose.Types.ObjectId.isValid(room._id)) {
      return res.status(400).json({ message: "Invalid Room ID format" });
    }
    const user = req.user;
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Section title is required" });
    }

    const isOwner = room.owner.equals(user._id);
    const memberInfo = room.members.find(
      (m) => m.user && m.user.equals(user._id)
    );
    const isAdmin = memberInfo?.isAdmin || false;

    if (!isOwner || !isAdmin) {
      return res.status(403).json({
        message: "Permission denied: Only owner and admins are allowed",
      });
    }

    const newSection = {
      title: title.trim(),
      resources: [],
    };

    room.resourceHub.push(newSection);

    await room.save();

    const addedSection = room.resourceHub[room.resourceHub.length - 1];
    return res.status(201).json(addedSection);
  } catch (error) {
    console.error("Error creating new Section: " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getSections = async (req, res) => {
  const sections = req.room.resourceHub;
  return res.status(200).json(sections);
};

module.exports = { addSection , getSections};
