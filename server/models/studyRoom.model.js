const mongoose = require("mongoose");
const sectionSchema = require("./section.model");

const studyRoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        isAdmin: {
          type: Boolean,
          default: false,
        },
      },
    ],
    whiteboardState: {
      type: String,
      default: "",
    },
    resourceHub: [sectionSchema],
  },
  { timestamps: true }
);

const StudyRoom = mongoose.model("StudyRoom", studyRoomSchema);
module.exports = StudyRoom;
