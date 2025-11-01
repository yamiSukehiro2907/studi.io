const mongoose = require("mongoose");

const validateSection = async (req, res, next) => {
  const sectionId = req.params.sectionId;
  const room = req.room;
  if (!mongoose.Types.ObjectId.isValid(sectionId)) {
    return res.status(400).json({ message: "Invalid Section ID format" });
  }
  try {
    const section = room.resourceHub.find(
      (s) => s._id.toString() === sectionId
    );
    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }
    req.section = section;
    next();
  } catch (error) {
    console.error("Error validating Section: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = validateSection;
