const BooksModel = require("../models/books.model");

// Récupérer tous les livres dans la base de données
module.exports.getBooks = async (req, res) => {
    res.json({ message : "les livres ont été récupérés avec succès !"})
}
// Récupérer un livre en fonction de son id
module.exports.getBook = async (req, res) => {
    res.json({ message : "le livre a été récupéré avec succès !"})
}
// Récupérer les 3 livres avec la meilleure note moyenne
module.exports.getTopBooks = async (req, res) => {
    res.json({ message : "les 3 meilleurs livres ont été récupérés avec succès !"})
}
// Ajouter un livre
module.exports.createBook = async (req, res) => {
    res.json({ message : "le livre a été créé avec succès !"})
}
// Modifier un livre
module.exports.updateBook = async (req, res) => {
    res.json({ message : "le livre a été modifié avec succès !"})
}
// Supprimer un livre
module.exports.deleteBook = async (req, res) => {
    res.json({ message : "le livre a été supprimé avec succès !"})
}
// Ajouter une note à un livre
module.exports.addRating = async (req, res) => {
    res.json({ message : "le livre a été noté avec succès !"})
}