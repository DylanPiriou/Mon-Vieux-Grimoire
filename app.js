const bodyParser = require('body-parser');
const express = require('express');
const connectDB = require('./config/mongo');
const dotenv = require("dotenv").config();
const authRoutes = require("./routes/auth");
const booksRoutes = require("./routes/books");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connexion à la base de données MongoDB
connectDB();

// Gestion des routes pour l'authentification et les livres
app.use("/api/auth/", authRoutes);
app.use("/api/books/", booksRoutes);

module.exports = app;