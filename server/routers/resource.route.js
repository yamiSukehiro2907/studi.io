const express = require("express");

const router = express.Router();

const {
  addResource,
  getAllResources,
  updateResource,
  deleteResource,
} = require("../controllers/resource.controller");

router.post("/create", addResource);

router.get("/", getAllResources);

router.put("/:resourceId/update", updateResource);

router.delete("/:resourceId", deleteResource);

module.exports = router;
