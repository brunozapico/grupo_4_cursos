const {check, validationResult, body} = require('express-validator');


module.exports = [
    body('category').custom((value) => {
        if(value == '0') {
            return false
        }
    }).withMessage('Tenes que seleccionar una categoria'),
    check('name').isLength({min: 3}).withMessage('El nombre del curso debe tener como minimo 3 caracteres'),
    check('description_full').isLength({min: 255}),
    check('description_short'),
    check('starts_date').isAfter().withMessage('La fecha de inicio debe ser porterior a la actual'), //chequea que la fecha sea porterior a la actual, ver si necesita parametros
    check('ends_date').isAfter('starts_date').withMessage('La fecha de fin debe ser porterior a la fecha de inicio'), //chequear parametros
    check('days'),
    check('shifts'),
    check('professor'),
    check('vacancies'),
    check('outstanding'),
    check('price'),
    check('image')
  ];