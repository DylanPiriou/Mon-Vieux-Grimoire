const jwt = require("jsonwebtoken");

// Vérifie si le token d'authentification est ok
module.exports.authenticate = (req, res, next) => {
    // Reset de req.auth
    req.auth = null;
    try{
        // Enlève "Bearer" pour ne récupérer que le token
        const token = req.headers.authorization.split(" ")[1];
        // Vérifie si le token n'existe pas ou est vide
        if(!token) return res.status(401).json({ error : "Une erreur est survenue. Token introuvable ou non valide."  });
        // Vérifie le JWT
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decodedToken);
        // Extrait l'id de l'utilisateur à partir du token décodé
        const userId = decodedToken.userId;
        req.auth = {
            userId
        };
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ error })
    }};
