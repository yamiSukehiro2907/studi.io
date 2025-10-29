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

module.exports = { addResource, getAllResources };
