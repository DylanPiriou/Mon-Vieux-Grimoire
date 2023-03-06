const validator = require("validator");

// Vérifie que l'email est au bon format
module.exports.emailValidator = (req, res, next) => {
    const email = req.body.email;
    console.log(email);
    if(validator.isEmail(email)){
        console.log("L'email est valide.");
        next();
    } else {
        console.log("L'email n'est pas valide.");
        res.status(400).json({ error : "Le format de l'email est invalide." });
    }
}