const db = require('../database/models');

module.exports = {
    create: (req, res, next) => {
        res.send(`CURSO AGREGADO PARA EL USER: ${req.params.userId}`);
    },
};