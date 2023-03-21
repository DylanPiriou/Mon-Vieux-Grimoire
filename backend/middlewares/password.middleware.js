const pwValidator = require("password-validator");

module.exports.passwordValidator = (req, res, next) => {
    const passwordSchema = new pwValidator();

    // Le schéma que doit respecter le mot de passe
    passwordSchema
    .is().min(4) // Minimum 4 caractères
    .is().max(20) // Maximum 20 caractères
    .has().uppercase() // Doit contenir une/des majuscule(s)
    .has().lowercase() // Doit contenir une/des minuscule(s)
    .has().digits(2) // Doit contenir au moins deux chiffres
    .has().not().spaces() // Ne doit pas contenir d'espaces
    .is().not().oneOf(['Password123', "Azerty123"]) // MP conformes mais interdits

    const password = req.body.password;
    // Vérifie que le mot de passe soit conforme au schéma
    if(!passwordSchema.validate(password)){
        console.log("Le mot de passe n'est pas valide.");
        return res.status(400).json({ error: process.env.DEV_MODE === "dev" ? error: `Mot de passe non conforme : ${passwordSchema.validate(password, { list : true})}`})
    }
    console.log("Le mot de passe est valide.");
    next();
}