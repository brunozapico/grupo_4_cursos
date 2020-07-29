const db = require('../database/models');

module.exports = (req, res, next) => {
    if(req.session.loggedIn != undefined) {
        db.Rol.findOne({where: {user_id_rol: req.session.loggedIn.id}})
        .then(user => {
            if(user != undefined) {
                return next();
            } else {
                res.redirect('/users');
            };
        });
    } else {
        res.redirect('/users');
    }
    
};