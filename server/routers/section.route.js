const express = require("express");
const {
  addSection,
  getSections,
} = require("../controllers/section.controller");
const validateSection = require("../middleware/sectionMiddleware.js");
const resourceRoutes = require("./resource.route");
const router = express.Router();

router.get("/", getSections);

router.post("/create", addSection);

router.use("/:sectionId", validateSection, resourceRoutes);

module.exports = router;
