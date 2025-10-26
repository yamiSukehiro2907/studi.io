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

        const roomWhiteBoardState = await StudyRoom.findById(roomId)
          .select("whiteboardState")
          .lean();
        if (roomWhiteBoardState && roomWhiteBoardState.whiteboardState) {
          socket.emit(
            "load-whiteboard-state",
            roomWhiteBoardState.whiteboardState
          );
        }
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
        await newMessage.populate("sender", "name profileImage username");

        io.to(roomId).emit("newMessage", newMessage);
      } catch (error) {
        console.error("Error saving/sending message:", error);
        socket.emit("messageError", { message: "Failed to send message" });
      }
    });

    socket.on("drawing", (data) => {
      const { roomId, payload } = data;

      if (!roomId || !payload) return;

      socket.to(roomId).emit("drawing", payload);
    });

    socket.on("save-whiteboard-state", async (data) => {
      const { roomId, state } = state;
      const userId = socket.user._id;

      if (!roomId || state === undefined) return;

      try {
        const room = await StudyRoom.findOne({
          _id: roomId,
          "members.user": userId,
        }).select("owner members");

        if (!room) return;

        const memberInfo = room.members.find((m) => m.user.equals(userId));

        const isOwner = room.owner.equals(userId);
        const isAdmin = memberInfo?.isAdmin || false;

        if (isOwner || isAdmin) {
          await StudyRoom.findByIdAndDelete(roomId, { whiteboardState: state });
          socket.to(roomId).emit("whiteboard-state-saved");
        } else {
          socket.emit("error", {
            message: "Only owner/admin are can save whiteboard state",
          });
        }
      } catch (error) {
        console.error(
          `Error saving whiteboard state for room ${roomId}:`,
          error
        );
        socket.emit("error", { message: "Failed to save whiteboard state." });
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
          userName: socket.user?.name || "Unknown User",
          roomId: roomId,
        });
      });
    });

    socket.on("error", (error) => {
      console.error(`Socket error for user ${socket.user?.name}:`, error);
    });
  });

  io.engine.on("connection_error", (err) => {
    console.error("Connection error:", err);
  });
};

module.exports = setupSocketHandlers;
