const { check } = require('express-validator');

module.exports = [
    check('email')
    .isEmail()
    .withMessage('Ingrese una dirección de correo electrónico válida.'),
];