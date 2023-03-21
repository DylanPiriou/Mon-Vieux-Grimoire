const express = require("express");
const { getBooks, getBook, getTopBooks, createBook, updateBook, deleteBook, addRating } = require("../controllers/books.controller");
const { authenticate } = require("../middlewares/authenticate.middleware");
const multer = require("../middlewares/multer-config");
const router = express.Router();

// Pour chaque endpoint on associe une fonction qui vient du dossier controllers pour ajouter la logique + middleware(s)
router.get("/bestrating", getTopBooks);
router.get("/:id", getBook);
router.get("/", getBooks);
router.post("/:id/rating", authenticate, addRating);
router.put("/:id", authenticate, multer, updateBook);
router.post("/", authenticate, multer, createBook);
router.delete("/:id", authenticate, deleteBook);

module.exports = router;