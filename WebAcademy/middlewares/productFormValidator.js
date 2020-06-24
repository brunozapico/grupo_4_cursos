const {check, validationResult, body} = require('express-validator');
const path = require('path');


module.exports = [
    body('category').custom((value) => {
        if(typeof value != "string")  { //no puedo hacer andar esto
            return false
        }
    }).withMessage('Tenes que seleccionar una categoria'),

    check('name').isLength({min: 3})
        .withMessage('El nombre del curso debe tener como minimo 3 caracteres'),

    check('description_full').isLength({min: 255})
        .withMessage('Debe de tener un minimo de 255 caracteres'),

    check('description_short').isLength({min: 50})
        .withMessage('Debe de tener un minimo de 50 caracteres'),

    check('starts_date').isAfter()
        .withMessage('La fecha de inicio debe ser porterior a la actual'), //chequea que la fecha sea porterior a la actual, ver si necesita parametros

    check('ends_date').isAfter('starts_date')
        .withMessage('La fecha de fin debe ser porterior a la fecha de inicio'), //chequear parametros

    body('days').custom((value)=>{

    }),

    body('shifts').custom((value)=>{        // terminar validaciones
        
    }),

    body('professor').custom((value)=>{
        
    }),
    check('vacancies').isInt({min: 12, max: 30}) // podria ser {min: 12, max: 30}
        .withMessage('Deben ser desde 12 a 30 vacantes'), // con este tengo dudas de la segunda parte (lo saque de gitHub)

    check('outstanding').isIn(['1', '0']).withMessage('Error en outstanding'),  // no estoy seguro si sera de esta forma

    check('price').isInt({min: 0, max: 999})
        .withMessage('Debe selecionar un precio'),  //estoy en duda de que sea asi o con un .isINT

    body('image')
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
                case '.gif':  // no creo que coloquen un gif, pero no seria mala idea
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