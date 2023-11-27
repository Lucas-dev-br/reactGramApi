const {body} = require("express-validator");

const userCreateValidation = () => {
    return [
        body("name").isString().withMessage("O nome é obrigatorio").isLength({min: 3}).withMessage("O nome precisa ter no mínimo 3 caracteres"),
        body("email").isString().withMessage("O email é obrigatorio").isEmail().withMessage("Insira um e-mail valído"),
        body("password").isString().withMessage("A senha é obrigatório").isLength({min: 5}).withMessage("A senha precisa ter no minímo 5 caracteres."),
        body("confirmPassword").isString().withMessage("A confirmação de senha é obrigatória.").custom((value, {req}) => {
            if(value != req.body.password) {
                throw new Error("AS senhas náo sáo igauis.")
            }
            return true 
        })
    ]
}

const loginValidation = () => {
    return [
        body("email").isString().withMessage("O email é obrigatorio!").isEmail().withMessage("Insira um e-mail válido."),
        body("password").isString().withMessage("A senha é obrigatorio"),
    ]
}

const userUpdateValidation = () => {
    return [
        body("name").optional().isLength({min: 3}).withMessage("O nome precisa de pelo menos 3 caracteres"),
        body("password").optional().isLength({min: 5}).withMessage("Precisa ter no minimo 5 caracteres")
    ]
}

module.exports = { 
    userCreateValidation,
    loginValidation,
    userUpdateValidation
}