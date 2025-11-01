const express = require("express");

const router = express.Router({ mergeParams: true });

const {
  addResource,
  getAllResources,
  updateResource,
  deleteResource,
} = require("../controllers/resource.controller");

const validateSection = require("../middleware/sectionMiddleware");

router.use(validateSection);

router.post("/create", addResource);

router.get("/", getAllResources);

router.put("/:resourceId", updateResource);

router.delete("/:resourceId", deleteResource);

module.exports = router;
