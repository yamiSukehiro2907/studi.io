const StudyRoom = require("../models/studyRoom.model.js");
const mongoose = require("mongoose");

const addResource = async (req, res) => {
  try {
    const room = req.room;
    const section = req.section;
    const { title, link } = req.body;

    if (!title || title.trim() === "" || !link) {
      return res
        .status(400)
        .json({ message: "Resource title and link required" });
    }

    const newResource = {
      title: title.trim(),
      link: link,
    };

    section.resources.push(newResource);

    await room.save();

    const addedResource = section.resources[section.resources.length - 1];
    return res.status(201).json(addedResource);
  } catch (error) {
    console.error("Error adding resource to section: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllResources = async (req, res) => {
  const resources = req.section.resources;
  return res.status(200).json(resources);
};

const updateResource = async (req, res) => {
  try {
    const resourceId = req.params.resourceId;
    const room = req.room;
    const section = req.section;
    const { title, link } = req.body;
    if (!title || title.trim() === "" || !link) {
      return res.status(400).json({ message: "Title and link are required" });
    }
    const resource = section.find((r) => r._id.equals(resourceId));
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    if (title && title.trim() !== "") resource.title = title.trim();
    if (link) resource.link = link;
    await room.save();
    const updatedResource = section.find((r) => r._id.equals(resourceId));
    return res.status(200).json(updatedResource);
  } catch (error) {
    console.error("Error updating resource: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addResource, getAllResources , updateResource};
