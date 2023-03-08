const booksModel = require("../models/books.model");


// -------- CREATION DE LA LOGIQUE DU CRUD POUR LES LIVRES --------- //

// Récupérer tous les livres dans la base de données
module.exports.getBooks = async (req, res) => {
    try{
        const books = await booksModel.find();
        res.status(200).json(books);
    }
    catch(error){
        res.status(400).json({ error: process.env.DEV_MODE === "dev" ? error : "Une erreur est survenue. Impossible de récupérer les livres."})
    }
}
// Récupérer les 3 livres avec la meilleure note moyenne
module.exports.getTopBooks = async (req, res) => {
    try{
        const topBooks = await booksModel.find().sort({ averageRating: -1 }).limit(3);
        res.status(200).json(topBooks);
    }
    catch(error){
        res.status(400).json({ error: process.env.DEV_MODE === "dev" ? error : "Une erreur est survenue."})
    }
}
// Récupérer un livre en fonction de son id
module.exports.getBook = async (req, res) => {
    const bookId = req.params.id;
    try{
        const book = await booksModel.findOne({ _id: bookId });
        res.status(200).json(book);
    }
    catch(error){
        res.status(400).json({ error: process.env.DEV_MODE === "dev" ? error : `Impossible de récupérer le livre n°${bookId}`})
    }
}
// Ajouter un livre
module.exports.createBook = async (req, res) => {
    try{

    }
    catch{

    }
}
// Modifier un livre
module.exports.updateBook = async (req, res) => {
    res.json({ message : "le livre a été modifié avec succès !"})
}
// Supprimer un livre
module.exports.deleteBook = async (req, res) => {
    const bookId = req.params.id;
    try{
        const book = await booksModel.findOne(bookId);
        const userId = await booksModel.userId;
    }
    catch{

    }
}
// Ajouter une note à un livre
module.exports.addRating = async (req, res) => {
    res.json({ message : "le livre a été noté avec succès !"})
}