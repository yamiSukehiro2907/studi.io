const mongoose = require("mongoose");
const resourceSchema = require("./resource.model");

const sectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  resources: [resourceSchema],
});
