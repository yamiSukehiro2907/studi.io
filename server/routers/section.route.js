const express = require("express");
const {
  addSection,
  getSections,
  updateSection,
  deleteSection,
} = require("../controllers/section.controller");
const validateSection = require("../middleware/sectionMiddleware.js");
const resourceRoutes = require("./resource.route");
const router = express.Router();

router.get("/", getSections);

router.post("/create", addSection);

router.put("/:sectionId/update", updateSection);

router.delete("/:sectionId", deleteSection);

router.use("/:sectionId", validateSection, resourceRoutes);

module.exports = router;
