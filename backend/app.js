const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const connectDB = require('./config/mongo');
const dotenv = require("dotenv").config();
const authRoutes = require("./routes/auth");
const booksRoutes = require("./routes/books");
const path = require("path");
const helmet = require('helmet');

const app = express();
// Middleware qui analyse le corps des requêtes HTTP et les transforme en objet JS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Gère les erreurs CORS
app.use(cors());
// Protection de l'API
// https://github.com/helmetjs/helmet
app.use(
    helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
      imgSrc: ["'self'", 'data:'],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  }));

// Connexion à la base de données MongoDB
connectDB();

// Gestion des routes pour l'authentification et les livres
app.use("/api/auth/", authRoutes);
app.use("/api/books/", booksRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;