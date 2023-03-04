const express = require('express');
const connectDB = require('./config/mongo');
const dotenv = require("dotenv").config();
const authRoutes = require("./routes/auth");
const booksRoutes = require("./routes/books");

const app = express();

// Connexion à la base de données MongoDB
connectDB();

// Test
app.use((req, res) => {
    res.json({ message: 'Votre requête a bien été reçue !' }); 
 });

// Gestion des routes
app.use("/api/auth/", authRoutes);
app.use("/api/books/", booksRoutes);

module.exports = app;