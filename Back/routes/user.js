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
  updatePicture,
  search,
  removePicture,
} = require("../controllers/user");

router.post("/register", register);
router.post("/login", login);
router.get("/me", validateAuth, me);
router.get("/search/:search", validateAuth, search);
router.post("/logout", logout);
router.delete("/:_id", validateAuth, validateAdmin, deleteUser);
router.put("/:_id", updateUser);
router.put("/picture", validateAuth, updatePicture);
router.post("/removepicture", validateAuth, removePicture);

module.exports = router;
