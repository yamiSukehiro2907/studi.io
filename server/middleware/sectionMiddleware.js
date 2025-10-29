const validateSection = async (req, res, next) => {
  const sectionId = req.params.sectionId;
  const room = req.room;
  const section = room.resourceHub.find((s) => s._id.equals(sectionId));
  if (!section) {
    return res.status(404).json({ message: "Section not found" });
  }
  req.section = section;
  next();
};

module.exports = validateSection;
