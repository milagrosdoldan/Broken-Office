const express = require("express");
const router = express.Router();
const User = require("./user");
const Report = require('./reports');

router.use("/user", User);
router.use("/report", Report);


module.exports = router;

