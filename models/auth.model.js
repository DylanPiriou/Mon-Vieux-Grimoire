const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Création du modèle que doivent suivre les données d'authentification de l'utilisateur pour la base de données
const authSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true // l'email doit être unique
        },
        password: {
            type: String,
            required: true
        }
    }
)

authSchema.plugin(uniqueValidator);

module.exports = mongoose.model("auth", authSchema);