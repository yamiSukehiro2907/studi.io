const StudyRoom = require("../models/studyRoom.model.js");
const uploadprofileImageCloudinary = require("../config/cloudinary.config");
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
      members: [
        {
          user: userId,
          isAdmin: true,
        },
      ],
      description: description ? description.trim() : undefined,
    };

    let studyRoom = await StudyRoom.create(newRoomData);

    studyRoom = await StudyRoom.findById(studyRoom._id)
      .populate("owner", "name profileImage email")
      .populate("members.user", "name profileImage email");

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

    const rooms = await StudyRoom.find({
      "members.user": userId,
    })
      .populate("owner", "name profileImage")
      .populate("members.user", "name profileImage")
      .sort({ createdAt: -1 });

    return res.status(200).json(rooms);
  } catch (error) {
    console.log("Error fetching rooms:", error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const getPublicRoom = async (req, res) => {
  try {
    const term = req.query.term || "";
    const query = {
      isPrivate: false,
      ...(term && { name: { $regex: term, $options: "i" } }),
    };

    const rooms = await StudyRoom.find(query)
      .populate("owner", "name profileImage")
      .populate("members.user", "name profileImage")
      .sort({ createdAt: -1 });
    return res.status(200).json(rooms);
  } catch (error) {
    console.log("Error fetching public rooms:", error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const getRoomInfo = async (req, res) => {
  try {
    const roomId = req.params.id;
    const userId = req.user._id;

    const room = await StudyRoom.findById(roomId)
      .populate("owner", "name profileImage email")
      .populate("members.user", "name profileImage email");
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const isMember = room.members.some((member) =>
      member.user._id.equals(userId)
    );
    if (!isMember) {
      return res.status(403).json({ message: "Access denied: Not a member" });
    }

    return res.status(200).json(room);
  } catch (error) {
    console.log("Error fetching room details:", error);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid Room ID format" });
    }
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
      return res
        .status(403)
        .json({ message: "This room is private and requires an invitation." });
    }

    const alreadyMember = room.members.some((member) =>
      member.user.equals(userId)
    );

    if (alreadyMember) {
      await room.populate("owner", "name profileImage email");
      await room.populate("members.user", "name profileImage email");
      return res.status(200).json({
        message: "You are already a member",
        room,
      });
    }

    room.members.push({ user: userId, isAdmin: false });
    await room.save();

    await room.populate("owner", "name profileImage email");
    await room.populate("members.user", "name profileImage email");

    return res.status(200).json({
      message: "Successfully joined the room",
      room,
    });
  } catch (error) {
    console.log("Error joining room:", error);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid Room ID format" });
    }
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const updateRoomInfo = async (req, res) => {
  try {
    const roomId = req.params.id;

    const { name, description, isPrivate } = req.body;

    if (!name && !description && !isPrivate && !req.file) {
      return res
        .status(400)
        .json({ message: "At least one field is required" });
    }

    const room = await StudyRoom.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (name && room.name !== name) {
      room.name = name;
    }
    if (description && room.description !== description) {
      room.description = description;
    }
    if (isPrivate && isPrivate === "true") {
      room.isPrivate = true;
    }
    if (req.file) {
      try {
        room.roomImage = await uploadprofileImageCloudinary(req.file);
      } catch (uploadError) {
        return res.status(500).json({
          message: "Failed to upload image",
          error: uploadError.message,
        });
      }
    }
    await room.save();

    let updatedRoom = await StudyRoom.findById(roomId)
      .populate("owner", "name profileImage")
      .populate("members.user", "name profileImage");

    return res.status(200).json(updatedRoom);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const roomId = req.params.id;
    const userId = req.user._id;

    const room = await StudyRoom.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (room.owner.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Only owners are allowed to delete the room" });
    }

    await StudyRoom.findByIdAndDelete(roomId);

    return res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.log("Error deleting room:", error);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid Room ID format" });
    }
    return res.status(500).json({ message: "Internal Server error" });
  }
};

module.exports = {
  createStudyRoom,
  getAllRooms,
  getRoomInfo,
  joinPublicRoom,
  getPublicRoom,
  updateRoomInfo,
  deleteRoom,
};
