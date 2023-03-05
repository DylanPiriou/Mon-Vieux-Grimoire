const mongoose = require("mongoose");

// Création du schéma que doivent suivre les données d'authentification de l'utilisateur pour la base de données
const authSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        passeword: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model("auth", authSchema);