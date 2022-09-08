const express = require("express");
const router = express.Router();

const { validateAuth, validateAdmin } = require("../middleware/auth");

const {
  register,
  login,
  me,
  deleteUser,
  updateUser,
  logout,
} = require("../controllers/user");

router.post("/register", register);
router.post("/login", login);
router.get("/me", validateAuth, me);
router.post("/logout", logout);
router.delete("/:_id", validateAuth, validateAdmin, deleteUser);
router.put("/:_id", updateUser);

module.exports = router;
