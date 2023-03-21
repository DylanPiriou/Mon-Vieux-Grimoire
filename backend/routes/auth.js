const express = require("express");
const { signUp, logIn } = require("../controllers/auth.controllers");
const { emailValidator, emailUnique } = require("../middlewares/email.middleware");
const { passwordValidator } = require("../middlewares/password.middleware");
const router = express.Router();

// Route pour la création d'un compte. Vérifie la forme du mot de passe + de l'email, et l'unicité de l'email dans la base de données
router.post("/signup", passwordValidator, emailValidator, emailUnique, signUp);
// Route pour la connexion
router.post("/login", logIn);

module.exports = router;