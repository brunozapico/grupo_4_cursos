const {check, validationResult, body} = require('express-validator');
const path = require('path');


module.exports = [
    body('category').custom((value) => {
        if(value == "0" )  {
            return false
        }
        return true
    }).withMessage('Tenes que seleccionar una categoria'),

    check('courseName').isLength({min: 3})
        .withMessage('El nombre del curso debe tener como minimo 3 caracteres'),

    check('description_full').isLength({min: 255})
        .withMessage('Debe de tener un minimo de 255 caracteres'),

    check('description_short').isLength({min: 50})
        .withMessage('Debe de tener un minimo de 50 caracteres'),

    check('starts_date').isAfter()
        .withMessage('La fecha de inicio debe ser posterior a la actual'),

    body('ends_date').custom((value, {req}) => {
        let starts_date = new Date (req.body.starts_date);
        let ends_date = new Date (value);

        if ((ends_date - starts_date) > 0) {
            return true
        }
        return false

    }).withMessage('La fecha de fin debe ser posterior a la fecha de inicio'),

    body('days').custom((value)=>{
        if(value == "0" )  {
            return false
        }
        return true

    }).withMessage('Debes seleccionar un dia'),

    body('shifts').custom((value)=>{  
        if(value == "0" )  {
            return false
        }
        return true    
        
    }).withMessage('Debes seleccionar un turno'),

    body('professor').custom((value)=>{
        if(value == "0" )  {
            return false
        }
        return true
        
    }).withMessage('Debes seleccionar un profesor'),

    check('vacancies').isInt({min: 12, max: 30})
        .withMessage('Deben ser desde 12 a 30 vacantes'),

    check('outstanding').isIn([1, 0]).withMessage('Debes seleccionar si es un Destacado o no'),

    check('price').isInt({min: 1})
        .withMessage('Debe selecionar un precio'),

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
                case '.gif':  
                    return true;
                default:
                    return false;
                }
            } else {
                return false;
            }
    })
    .withMessage('Tenes que cargar un archivo y debe ser de formato: ".jpg", ".jpeg", ".png" o ".gif".')
  ];