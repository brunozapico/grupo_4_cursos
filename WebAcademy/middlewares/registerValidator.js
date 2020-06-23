const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { check, validationResult, body } = require('express-validator');
const db = require('../database/models');

module.exports = [
    check('name')
    .isLength({min:2})
    .withMessage('El nombre debe tener un mínimo de 2 carácteres.'),
    
    check('email')
    .isEmail()
    .withMessage('Debes ingresar una dirección de correo electrónico válida.'),
    
    // SOLUCIONAR ESTA VALIDACION
    body('email')
    .custom( (value, {req}) => {
        if(value != '') {
            db.User.findOne({where: {email: req.body.email}})
            .then(user => {
                // console.log(`USER ES: ${user}`)
                if(user != null){
                    return false;
                }
                return true;
            })
        } else {
            return true;
        }
    })
    .withMessage('Esa dirección de correo electrónico ya existe.'),
    
    check('password')
    .isLength({min:8})
    .withMessage('La contraseña debe tener al menos 8 carácteres.'),
    
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
    .withMessage('El archivo debe ser de formato: ".jpg", ".jpeg", ".png" o ".gif".'),

    body('c-password')
    .custom((value, {req}) => {
        if(value != req.body.password) {
            return false
        }

        return true;
    })
    .withMessage('Las contraseñas no coinciden.')
]