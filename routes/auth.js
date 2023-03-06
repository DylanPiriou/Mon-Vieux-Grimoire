const express = require("express");
const { signUp, logIn } = require("../controllers/auth.controllers");
const { emailValidator } = require("../middlewares/email.middleware");
const router = express.Router();

router.post("/signup", emailValidator, signUp);
router.post("/login", logIn);

module.exports = router;