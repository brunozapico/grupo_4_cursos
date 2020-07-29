const db = require('../database/models');

module.exports = (req, res, next) => {

    console.log(req.session.loggedIn)
    
    if(req.cookies.remember != undefined && req.session.loggedIn == undefined) {
        let loginUser;
        db.User.findOne({where: {id: req.cookies.remember}})
        .then(user => {
            if(user != null){
                loginUser = user;
                req.session.loggedIn = loginUser;
            };
        });
    };
    
    return next();
    
};