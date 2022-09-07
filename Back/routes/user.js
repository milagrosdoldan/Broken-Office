const express = require("express");
const router = express.Router();

const { validateAuth, validateAdmin } = require("../middleware/auth");

const {register, login, me, all, deleteUser, updateUser, } = require("../controllers/user");


router.post("/register", register);
router.post("/login", login);
router.get("/me", validateAuth, me);

router.get("/all", validateAuth, validateAdmin, all);
router.delete("/:id", validateAuth, validateAdmin, deleteUser );
router.put("/:id", updateUser);


module.exports = router;
