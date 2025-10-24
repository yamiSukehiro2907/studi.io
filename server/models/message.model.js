const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudyRoom",
      required: true,
    },
  },
  { timestamps: true }
);

messageSchema.index({ room: 1, createdAt: 1 });

const Message = mongoose.model("message", messageSchema);
module.exports = Message;
