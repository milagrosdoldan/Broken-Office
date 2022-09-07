const express = require("express");
const router = express.Router();

const {register, login, me, all} = require("../controllers/user");

router.post("/register", register);
router.post("/login", login);
router.get("/me", me);
router.get("/all", all);