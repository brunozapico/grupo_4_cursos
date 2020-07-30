const db = require('../database/models');

module.exports = (req, res, next) => {
    if (req.session.loggedIn != undefined) {
        db.Rol.findOne({ where: { user_id_rol: req.session.loggedIn.id } })
            .then(user => user != undefined ? next() : res.redirect('/'));
    } else {
        res.redirect('/users/login');
    };
};