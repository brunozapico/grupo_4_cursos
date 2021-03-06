let db = require('../database/models');

let indexController = {
    index: (req, res) => {
        let categories = db.Category.findAll({
            include: [{ association: 'courses' }]
        })
        let course = db.Course.findAll({
            where: {
                outstanding : 1
            }
        })
        let tips = db.Tip.findAll()

        Promise.all([categories, course, tips])
        .then(([categories, course, tips])=>{
            res.render('index', {categories, course, tips, loggedInUser: req.session.loggedIn});
        })
    },
    shoppingCart: (req, res) => {
        db.Category.findAll({
            include: [{ association: 'courses' }]
        })
            .then(categories => {
                res.render('shoppingCart', {categories, loggedInUser: req.session.loggedIn})
            });
    }
};

module.exports = indexController;