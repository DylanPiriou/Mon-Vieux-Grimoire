const express = require("express");
const { signUp, logIn } = require("../controllers/auth.controllers");
const { emailValidator, emailUnique } = require("../middlewares/email.middleware");
const router = express.Router();

router.post("/signup", emailValidator, emailUnique, signUp);
router.post("/login", logIn);

module.exports = router;