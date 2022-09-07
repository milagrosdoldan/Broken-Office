const express = require('express');
const router = express.Router();
const Reports = require('./reports');
const Auth = require('./user.js');

router.use("/reports", Reports);
router.use("/auth", Auth);

module.exports = router;
