const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { check, validationResult, body } = require('express-validator');
const db = require('../database/models');

module.exports = [
    check('email')
    .isEmail()
    .withMessage('Ingrese una dirección de correo electrónico válida.'),
    
    // SOLUCIONAR ESTA VALIDACION
    body('email')
    .custom( (value, {req}) => {
        if(value != ''){
            db.User.findOne({where: {email: req.body.email}})
            .then(user => {
                if (user != null){
                    return true;
                } else {
                    return false;
                }
            });
        } else {
            return true; // se agarra el error con el isEmail(), si no se repite.
        }
    })
    .withMessage('Ingrese una dirección de correo electrónico válida.'),
    
    // SOLUCIONAR ESTA VALIDACION
    body('password')
    .custom( (value, {req}) => {
        let check;
        db.User.findOne({where: {email: req.body.email}})
        .then(user => {
            if(user != null) {
                check = bcrypt.compareSync(req.body.password, user.password);
                return check;
            } else {
                return false;
            }
        })
    })
    .withMessage('Contraseña incorrecta.')
]