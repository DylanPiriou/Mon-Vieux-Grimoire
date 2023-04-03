const validator = require("validator");
const authModel = require("../models/auth.model");

// Vérifie que l'email est au bon format
module.exports.emailValidator = (req, res, next) => {
    const email = req.body.email;
    if(validator.isEmail(email)){
        console.log("L'email est valide.");
        next();
    } else {
        console.log("L'email n'est pas valide.");
        return res.status(400).json({ error: "Le format de l'email est invalide." });
    }
}

// Vérifie si l'email est unique dans la base de données
module.exports.emailUnique = async (req, res, next) => {
    const { email } = req.body;
    try{
        const isEmailExist = await authModel.findOne({ email });
        if(isEmailExist){
            console.log("L'email est déjà utilisé.");
            return res.status(400).json({ error : "L'email est déjà utilisé." })
        }
            next();
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error });
    }
}