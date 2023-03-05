const authModel = require("../models/auth.model");
const bcrypt = require("bcrypt");

// -------- CREATION DE LA LOGIQUE D'AUTHENTIFICATION -------- //

// Créer l'utilisateur
module.exports.signUp = async (req, res) => {
    const { email, password } = req.body;
    try{
        // Cryptage du mot de passe avec la méthode hash() fournie par bcrypt
        const cryptedPassword = await bcrypt.hash(password, 10) // 10 = compléxité
        // Création d'un nouvel utilisateur avec mot de passe crypté
        const user = new authModel({
            email,
            password: cryptedPassword
        });
        await user.save();
        res.status(200).json({ message: "Utilisateur créé avec succès !" })
    }
    catch(error){
        res.status(400).json({ error: "Une erreur est survenue." })
    }
}

// Reconnaître l'utilisateur et vérifier le mot de passe
module.exports.logIn = async (req, res) => {
    const { email, password } = req.body;
    try{
        // Mail unique. Recherche de l'utilisateur grâce au mail
        const user = await authModel.findOne({ email });
        if (user){
            // Mot de passe fourni = mot de passe enregirstré ?
            const passwordsMatch = await bcrypt.compare(password, user.password);
            if(passwordsMatch){
                res.status(200).json({ message: "Connexion réussie !" })
            } else {
                res.status(400).json({ message: "Mot de passe incorrect." })
            }
        } else{
            res.status(400).json({ message: "Informations utilisateur incorrectes." })
        }
    }
    catch(error){
        res.status(400).json({ error: "Une erreur est survenue." })
    }
}