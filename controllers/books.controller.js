const booksModel = require("../models/books.model");
const BooksModel = require("../models/books.model");

// -------- CREATION DE LA LOGIQUE DU CRUD --------- //

// Récupérer tous les livres dans la base de données
module.exports.getBooks = async (req, res) => {
    try{
        const books = await booksModel.find();
        res.status(200).json(books);
    }
    catch(error){
        res.status(400).json({ error : "Une erreur est survenue. Impossible de récupérer les livres."})
    }
}
// Récupérer un livre en fonction de son id
module.exports.getBook = async (req, res) => {
    try{
        const book = await booksModel.findOne({_id: req.params.id});
        res.status(200).json(book);
    }
    catch(error){
        res.status(400).json({ error : `Impossible de récupérer le livre n°${req.params.id}`})
    }
}
// Récupérer les 3 livres avec la meilleure note moyenne
module.exports.getTopBooks = async (req, res) => {
    try{
    }
    catch(error){
        res.status(400).json({ error : "Une erreur est survenue."})
    }
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