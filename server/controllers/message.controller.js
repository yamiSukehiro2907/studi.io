const StudyRoom = require("../models/studyRoom.model.js");
const Message = require("../models/message.model.js");
const mongoose = require("mongoose");

const MESSAGES_PER_PAGE = 50;

const getMessagesForRoom = async (req, res) => {
  try {
    const { id: roomId } = req.params;
    const userId = req.user._id;
    const page = Math.max(1, parseInt(req.query.page || "1", 10));

    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      return res.status(400).json({ message: "Invalid Room ID format" });
    }

    const room = await StudyRoom.findById(roomId).select("members").lean();
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const isMember = room.members.some((member) => member.user.equals(userId));
    if (!isMember) {
      return res
        .status(403)
        .json({ message: "Access denied: You are not a member of this room." });
    }

    const skip = (page - 1) * MESSAGES_PER_PAGE;

    const results = await Message.aggregate([
      { $match: { room: new mongoose.Types.ObjectId(roomId) } },
      {
        $facet: {
          totalCount: [{ $count: "count" }],
          messages: [
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: MESSAGES_PER_PAGE },
            {
              $lookup: {
                from: "users",
                localField: "sender",
                foreignField: "_id",
                as: "senderInfo",
              },
            },
            { $unwind: "$senderInfo" },
            { $sort: { createdAt: 1 } },
            {
              $project: {
                _id: 1,
                content: 1,
                room: 1,
                createdAt: 1,
                updatedAt: 1,
                sender: {
                  _id: "$senderInfo._id",
                  name: "$senderInfo.name",
                  profileImage: "$senderInfo.profileImage",
                },
              },
            },
          ],
        },
      },
      {
        $project: {
          messages: "$messages",
          totalMessages: { $arrayElemAt: ["$totalCount.count", 0] },
        },
      },
    ]);

    const result = results[0] || { messages: [], totalMessages: 0 };
    const messages = result.messages;
    const totalMessages = result.totalMessages || 0;
    const totalPages = Math.ceil(totalMessages / MESSAGES_PER_PAGE);
    console.log(messages)
    return res.status(200).json({
      messages: messages,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalMessages: totalMessages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({
      message: "Failed to fetch messages",
      ...(process.env.NODE_ENV === "development" && {
        error: error.message,
      }),
    });
  }
};

module.exports = { getMessagesForRoom };
