const booksModel = require("../models/books.model");
const fs = require("fs");
const { calcAverageRating } = require("../utils/averageRating");


// -------- CREATION DE LA LOGIQUE DU CRUD POUR LES LIVRES --------- //

// Récupérer tous les livres dans la base de données
module.exports.getBooks = async (req, res) => {
    try {
        const books = await booksModel.find();
        res.status(200).json(books);
    }
    catch (error) {
        res.status(400).json({ error: process.env.DEV_MODE === "dev" ? error : "Une erreur est survenue. Impossible de récupérer les livres." })
    }
};

// Récupérer les 3 livres avec la meilleure note moyenne
module.exports.getTopBooks = async (req, res) => {
    try {
        const topBooks = await booksModel.find().sort({ averageRating: -1 }).limit(3);
        res.status(200).json(topBooks);
    }
    catch (error) {
        res.status(400).json({ error: process.env.DEV_MODE === "dev" ? error : "Une erreur est survenue." });
    }
}
// Récupérer un livre en fonction de son id
module.exports.getBook = async (req, res) => {
    const bookId = req.params.id;
    try {
        const book = await booksModel.findOne({ _id: bookId });
        res.status(200).json(book);
    }
    catch (error) {
        res.status(400).json({ error: process.env.DEV_MODE === "dev" ? error : `Impossible de récupérer le livre n°${bookId}` });
    }
};

// Ajouter un livre
module.exports.createBook = (req, res) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;
    // Création de l'objet 
    const book = new booksModel({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    });
    book.save()
        .then(() => res.status(201).json({ message: "Livre enregistré." }))
        .catch(error => res.status(400).json({ error }))
};

// Modifier un livre
module.exports.updateBook = (req, res) => {
    // Vérifie si il y a un fichier, si oui on traite l'image sinon on traite l'objet
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    } : { ...req.body };
    delete bookObject._userId;
    // Recherche le livre en fonction de l'id dans la base de données
    booksModel.findOne({ _id: req.params.id })
        .then(book => {
            // Vérifie si l'userId du livre correspond à celui qui fait la requête
            if (book.userId !== req.auth.userId) {
                res.status(401).json({ message: "Non autorisé à modifier ce livre." });
            } else {
                // Modifier les données du livre dans la base de données
                booksModel.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
                    .then(() => res.status(201).json({ message: "Le livre a été modifié avec succès !" }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
};

// Supprimer un livre
module.exports.deleteBook = (req, res) => {
    // Recherche l'id du livre à supprimer dans la base de données
    booksModel.findOne({ _id: req.params.id })
        .then(book => {
            // Vérifie si l'userId du livre correspond à celui qui fait la requête
            if (book.userId !== req.auth.userId) {
                res.status(401).json({ message: "Non autorisé à supprimer ce livre." });
            } else {
                // Récupère le nom du fichier
                const filename = book.imageUrl.split("/images/")[1];
                // Supprime le fichier
                fs.unlink(`images/${filename}`, () => {
                    // Supprime le livre de la base de données
                    booksModel.deleteOne({ _id: req.params.id })
                        .then(() => res.status(201).json({ message: "Le livre a été supprimé avec succès !" }))
                        .catch(error => res.status(401).json({ error }));
                })
            }
        })
};

// Ajouter une note à un livre
module.exports.addRating = (req, res) => {
    // Vérifie l'utilisateur
    if(req.body.userId !== req.auth.userId){
        res.status(401).json({ error: "Non autorisé à ajouter une note." });
    }

    // Recherche le livre à noter en fonction de son id
    booksModel.findOne({ _id: req.params.id })
        .then(book => {
            // Vérifie si l'utilisateur n'a pas déjà noté le livre
            if(book.ratings.find(rating => rating.userId === req.body.userId)){
                res.status(401).json({ error : "Livre déjà noté par l'utilisateur." })
            } else {
                // Pousse les nouvelles données dans le tableau
                const cloneBook = book;
                cloneBook.ratings.push({
                    userId: req.auth.userId,
                    grade: req.body.rating,
                    _id: req.body._id
                });
                // Calcule la moyenne
                cloneBook.averageRating = calcAverageRating(book.ratings);
                console.log(cloneBook.averageRating)
                // Met à jour la base de données
                booksModel.updateOne({ _id: req.params.id }, { ...cloneBook})
                    .then(() => res.status(201).json(book))
                    .catch(error => res.status(401).json({ error }))
            }
        })
        .catch(error => res.status(401).json({ error }));
}