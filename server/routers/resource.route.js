const express = require("express");

const router = express.Router()

const {addResource} = require("../controllers/resource.controller")

router.post("/add" , addResource)

module.exports = router;