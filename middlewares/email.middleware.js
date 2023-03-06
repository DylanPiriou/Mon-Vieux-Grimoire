const validator = require("validator");

// Vérifie que l'email est au bon format
module.exports.emailValidator = (req, res, next) => {
    const email = req.body.email;
    if(validator.isEmail(email)){
        console.log("Email is valid");
        next();
    } else {
        console.log("Email is not valid");
        res.status(400).json({ error : "Invalid email" });
    }
}