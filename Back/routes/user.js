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
  userSearch,
} = require("../controllers/user");

router.post("/register", register);
router.post("/login", login);
router.get("/me", validateAuth, me);
router.get("/search/:search", validateAuth, userSearch);
router.post("/logout", logout);
router.delete("/:_id", validateAuth, validateAdmin, deleteUser);
router.put("/:_id", updateUser);
router.put("/picture", validateAuth, updatePicture);
router.post("/removePicture", validateAuth, removePicture);

module.exports = router;
