const express = require("express");
const {
  addSection,
  getSections,
  updateSection,
  deleteSection,
} = require("../controllers/section.controller");
const resourceRoutes = require("./resource.route");
const router = express.Router({ mergeParams: true });

router.get("/", getSections);

router.post("/create", addSection);

router.put("/:sectionId", updateSection);

router.delete("/:sectionId", deleteSection);

router.use("/:sectionId", resourceRoutes);

module.exports = router;
