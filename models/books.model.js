const mongoose = require("mongoose");

// Création du modèle que doivent suivre les livres pour la base de données
const bookSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            require: true
        },
        allRatings: [
            {
                userId: {
                    type: String,
                    required: true
                },
                score: {
                    type: Number,
                    required: true
                }
            }
        ],
        averageRating: {
            type: Number,
            required: true
        }
    }
)

module.exports = mongoose.model('Book', bookSchema);