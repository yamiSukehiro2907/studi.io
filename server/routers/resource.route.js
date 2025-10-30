const express = require("express");

const router = express.Router();

const {
  addResource,
  getAllResources,
  updateResource,
  deleteResource,
} = require("../controllers/resource.controller");

router.post("/add", addResource);

router.get("/", getAllResources);

router.put("/:resourceId/update", updateResource);

router.delete("/:resourceId", deleteResource);

module.exports = router;
