const jwt = require("jsonwebtoken");

// Vérifie si le token d'authentification est ok
module.exports.authenticate = (req, res, next) => {
    // Vérifie si le token existe et enlève "Bearer"
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    !token && res.status(401).json({ error : "Le token n'a pas été trouvé" });
    try{
        // Vérifie le JWT
        jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ error: "Le token n'est pas valide." })
    }};