const express = require('express');
const authRoutes = require("./routes/auth");
const booksRoutes = require("./routes/books");

const app = express();

app.use((req, res) => {
    res.json({ message: 'Votre requête a bien été reçue !' }); 
 });

// Gestion des routes
app.use("/api/auth/", authRoutes);
app.use("/api/books/", booksRoutes);

module.exports = app;