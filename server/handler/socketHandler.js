const authenticateSocket = require("../middleware/socketAuth.js");
const StudyRoom = require("../models/studyRoom.model.js");
const Message = require("../models/message.model.js");
const mongoose = require("mongoose");

const setupSocketHandlers = (io) => {
  io.use(authenticateSocket);

  io.on("connection", (socket) => {
    const userId = socket.user._id;

    socket.on("join-room", async (roomId) => {
      try {
        if (!mongoose.Types.ObjectId.isValid(roomId)) {
          socket.emit("error", { message: "Invalid room ID" });
          return;
        }

        const room = await StudyRoom.findById(roomId).select("members");

        if (!room) {
          socket.emit("error", { message: "Room not found" });
          return;
        }

        const isMember = room.members.some((memberObj) =>
          memberObj.user.equals(userId)
        );

        if (!isMember) {
          socket.emit("error", {
            message: "You are not a member of this room",
          });
          return;
        }

        socket.join(roomId);

        socket.to(roomId).emit("user-joined", {
          userId: userId.toString(),
          userName: socket.user.name,
          userProfileImage: socket.user.profileImage,
          roomId: roomId,
        });
      } catch (error) {
        console.error("Error joining room:", error);
        socket.emit("error", { message: "Failed to join room" });
      }
    });

    socket.on("sendMessage", async (data) => {
      const { roomId, content } = data;
      const senderId = socket.user._id;

      if (!roomId || !content || content.trim() === "") {
        socket.emit("messageError", {
          message: "Message content or room ID missing",
        });
        return;
      }

      if (!mongoose.Types.ObjectId.isValid(roomId)) {
        socket.emit("messageError", { message: "Invalid room ID" });
        return;
      }

      try {
        const room = await StudyRoom.findById(roomId).select("members");

        if (!room) {
          socket.emit("messageError", { message: "Room not found" });
          return;
        }

        const isMember = room.members.some((memberObj) =>
          memberObj.user.equals(senderId)
        );

        if (!isMember) {
          socket.emit("messageError", {
            message: "You are not a member of this room",
          });
          return;
        }

        const newMessage = new Message({
          content: content.trim(),
          sender: senderId,
          room: roomId,
        });

        await newMessage.save();
        await newMessage.populate("sender", "name profileImage");

        io.to(roomId).emit("newMessage", newMessage);
      } catch (error) {
        console.error("Error saving/sending message:", error);
        socket.emit("messageError", { message: "Failed to send message" });
      }
    });

    socket.on("leave-room", (roomId) => {
      socket.leave(roomId);

      socket.to(roomId).emit("user-left", {
        userId: userId.toString(),
        userName: socket.user.name,
        roomId: roomId,
      });
    });

    socket.on("disconnect", () => {
      const rooms = Array.from(socket.rooms).filter(
        (room) => room !== socket.id
      );

      rooms.forEach((roomId) => {
        socket.to(roomId).emit("user-left", {
          userId: userId.toString(),
          userName: socket.user?.name || "Someone",
          roomId: roomId,
        });
      });
    });
  });
};

module.exports = setupSocketHandlers;
