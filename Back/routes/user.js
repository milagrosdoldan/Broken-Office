const express = require("express");
const router = express.Router();

const { validateAuth } = require("../middleware/auth");

const { register, login, me, all, deleteUser } = require("../controllers/user");

router.post("/register", register);
router.post("/login", login);
router.get("/me", validateAuth, me);
router.get("/all", all);
router.get("/delete", deleteUser);

module.exports = router;
