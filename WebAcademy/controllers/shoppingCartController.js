const db = require('../database/models');
const helper = require('./helpers/shoppingCartHelper');

module.exports = {
    list: (req, res, next) => {
        db.Category.findAll({
            include: [{ association: 'courses' }]
        })
            .then(categories => {
                res.render('CART', {categories, loggedInUser: req.session.loggedIn})
            });
    },
    create: (req, res, next) => {
        // BUSCO EL CARRITO ACTIVO DEL USUARIO
        db.ShoppingCart.findOne({where: {user_id: req.params.userId, status: 1}})
        .then(cart => {
            if(!cart) {
                // SI NO HAY CARRITO, LO CREO Y AGREGO EL CURSO
                db.ShoppingCart.create({user_id: req.params.userId})
                .then(cart => {
                    helper.create_course(cart.id, req.body.course_id, res)
                })
                .catch(err => res.json({msg: 'ERROR', err}));
            } else {
                // SI YA EXISTIA, AGREGO EL CURSO EN ESE SHOPPING CART
                helper.create_course(cart.id, req.body.course_id, res)
            };
        })
        .catch(err => res.json({msg: 'ERROR', err}));
    },
};