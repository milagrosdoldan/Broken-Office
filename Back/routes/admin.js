const express = require("express");
const router = express.Router();

const { validateAuth, validateAdmin } = require("../middleware/auth");

const {
  promote,
  demote,
  all,
  activate,
  deactivate,
  oneUser
} = require("../controllers/admin");

router.put("/promote/:userId", validateAuth, validateAdmin, promote);
router.put("/demote/:userId", validateAuth, validateAdmin, demote);
router.put("/activate/:userId", validateAuth, validateAdmin, activate);
router.put("/deactivate/:userId", validateAuth, validateAdmin, deactivate);
router.get("/all", validateAuth, validateAdmin, all);
router.get("/user/:id",validateAuth,validateAdmin, oneUser)
module.exports = router;
