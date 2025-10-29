const express = require("express");

const router = express.Router()

const {addResource , getAllResources} = require("../controllers/resource.controller")

router.post("/add" , addResource)

router.get("/" , getAllResources)

module.exports = router;