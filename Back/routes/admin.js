const express = require("express");
const router = express.Router();

const { validateAuth, validateAdmin } = require("../middleware/auth");

const {
  promote,
  demote
} = require("../controllers/admin");

router.put("/promote/:userId", validateAuth, validateAdmin, promote);
router.put("/demote/:userId", validateAuth, validateAdmin, demote);

module.exports = router;