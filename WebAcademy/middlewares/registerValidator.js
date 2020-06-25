const path = require('path');
const { check, body } = require('express-validator');

module.exports = [
    check('name')
    .isLength({min:2})
    .withMessage('El nombre debe tener un mínimo de 2 carácteres.'),
    
    check('email')
    .isEmail()
    .withMessage('Debes ingresar una dirección de correo electrónico válida.'),
    
    check('password')
    .isLength({min:8})
    .withMessage('La contraseña debe tener al menos 8 carácteres.'),

    body('c_password')
    .custom((value, {req}) => {
        if(value != req.body.password) {
            return false
        }
        return true;
    })
    .withMessage('Las contraseñas no coinciden.'),
    
    body('avatar')
    .custom((value, {req}) => {
        if(req.files[0] != undefined) {
            let extension = (path.extname(req.files[0].filename)).toLowerCase();
            switch(extension) {
            case '.jpg':
                return true;
            case '.jpeg':
                return true;
            case '.png':
                return true;
            case '.gif':
                return true;
            default:
                return false;
            }
        } else {
            return true;
        }
    })
    .withMessage('El archivo debe ser de formato: ".jpg", ".jpeg", ".png" o ".gif".')
];