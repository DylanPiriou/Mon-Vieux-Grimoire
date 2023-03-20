const pwValidator = require("password-validator");

module.exports.passwordValidator = (req, res, next) => {
    const passwordSchema = new pwValidator();

    // Le schéma que doit respecter le mot de passe
    passwordSchema
    .is().min(4)
    .is().max(20)
    .has().uppercase()
    .has().lowercase()
    .has().digits(2)
    .has().not().spaces()    
    .is().not().oneOf(['Password123', "Azerty123"]);

    const password = req.body.password;
    // Vérifie que le mot de passe soit conforme au schéma
    if(!passwordSchema.validate(password)){
        console.log("Le mot de passe n'est pas valide.");
        return res.status(400).json({ error: `Mot de passe non conforme : ${passwordSchema.validate(password, { list : true})}`})
    }
    console.log("Le mot de passe est valide.");
    next();
}