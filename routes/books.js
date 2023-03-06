const express = require("express");
const { getBooks, getBook, getTopBooks, createBook, updateBook, deleteBook, addRating } = require("../controllers/books.controller");
const { authenticate } = require("../middlewares/authenticate.middleware");
const router = express.Router();

// Pour chaque endpoint on associe une fonction qui vient du dossier controllers pour ajouter la logique + middleware(s) pour certaines
router.get("/", getBooks);
router.get("/bestrating", getTopBooks);
router.get("/:id", getBook);
router.post("/", authenticate, createBook);
router.put("/:id", authenticate, updateBook);
router.delete("/:id", authenticate, deleteBook);
router.post("/:id/rating", authenticate, addRating);

module.exports = router;