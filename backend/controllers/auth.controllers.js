const authModel = require("../models/auth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// -------- CREATION DE LA LOGIQUE D'AUTHENTIFICATION -------- //

// Créer l'utilisateur
module.exports.signUp = async (req, res) => {
    // console.log(crypto.randomBytes(64).toString('hex'));
    try {
        // Cryptage du mot de passe avec la méthode hash() fournie par bcrypt
        const cryptedPassword = await bcrypt.hash(req.body.password, 10) // 10 = compléxité
        // Création d'un nouvel utilisateur avec mot de passe crypté
        const user = new authModel({
            email: req.body.email,
            password: cryptedPassword
        });
        await user.save();
        res.status(200).json({ message: "Utilisateur créé avec succès !" })
    }
    catch (error) {
        res.status(500).json({ error: process.env.DEV_MODE === "dev" ? error: "Une erreur est survenue." })
    }
}

// Reconnaître l'utilisateur et vérifier le mot de passe
module.exports.logIn = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    try {
        // Mail unique. Recherche de l'utilisateur grâce au mail
        const user = await authModel.findOne({ email });
        console.log(user)
        if (user) {
            // Mot de passe fourni = mot de passe enregirstré ?
            const passwordsMatch = await bcrypt.compare(password, user.password);
            if (!passwordsMatch) {
                res.status(400).json({ message: "Mot de passe incorrect." })
            }
            // Création du JWT
            const userId = user._id;
            const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
                expiresIn: "24h",
            });
            res.status(200).json({
                userId,
                token
            })
        } else {
            res.status(401).json({ message: "Les informations utilisateur sont incorrectes." })
        }
    }
    catch (error) {
        res.status(500).json({ error: "Une erreur est survenue." })
    }
}