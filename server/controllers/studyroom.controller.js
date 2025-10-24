const StudyRoom = require("../models/studyRoom.model.js");

const createStudyRoom = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user._id;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Room name is required" });
    }

    const newRoomData = {
      name: name.trim(),
      owner: userId,
      members: [userId],
      description: description ? description.trim() : undefined,
    };

    const studyRoom = await StudyRoom.create(newRoomData);

    await studyRoom.populate("owner", "name profileImage");

    return res.status(201).json({
      message: "Room successfully created",
      room: studyRoom,
    });
  } catch (error) {
    console.log("Error creating study room:", error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const getAllRooms = async (req, res) => {
  try {
    const userId = req.user._id;
    const rooms = await StudyRoom.find({ members: userId })
      .populate("owner", "name profileImage")
      .sort({ createdAt: -1 });

    return res.status(200).json(rooms);
  } catch (error) {
    console.log("Error fetching rooms:", error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const getRoomInfo = async (req, res) => {
  try {
    const roomId = req.params.id;
    const room = await StudyRoom.findById(roomId)
      .populate("owner", "name username profileImage email")
      .populate("members", "name username profileImage email");
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    return res.status(200).json(room);
  } catch (error) {
    console.log("Error fetching room details:", error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const joinPublicRoom = async (req, res) => {
  try {
    const roomId = req.params.id;
    const userId = req.user._id;
    const room = await StudyRoom.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    if (room.isPrivate) {
      return res.status(409).json({ message: "Room is private" });
    }
    const alreadyMember = room.members.some((memberId) =>
      memberId.equals(userId)
    );

    if (alreadyMember) {
      return res.status(200).json(room);
    }

    room.members.push(userId);
    await room.save();

    await room.populate("owner", "name username profileImage");
    await room.populate("members", "name username profileImage");

    return res.status(200).json({ message: "Successfully joined the room" });
  } catch (error) {
    console.log("Error fetching room details:", error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

module.exports = { createStudyRoom, getAllRooms, getRoomInfo, joinPublicRoom };
