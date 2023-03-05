const express = require("express");
const { getBooks, getBook, getTopBooks, createBook, updateBook, deleteBook, addRating } = require("../controllers/books.controller");
const router = express.Router();

// Pour chaque endpoint on associe une fonction qui vient du dossier controllers pour ajouter la logique
router.get("/", getBooks);
router.get("/bestrating", getTopBooks);
router.get("/:id", getBook);
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
router.post("/:id/rating", addRating);

module.exports = router;