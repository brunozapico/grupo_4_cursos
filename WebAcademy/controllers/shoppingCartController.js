const db = require('../database/models');
const helper = require('./helpers/shoppingCartHelper');

module.exports = {
    list: (req, res, next) => {
        db.Category.findAll({
            include: [{ association: 'courses' }]
        })
            .then(categories => {
                db.ShoppingCart.findOne({where: {user_id: req.session.loggedIn.id, status: 1}})
                    .then(cart => {
                        if(cart) {
                            db.CartCourse.findAll({where: {shopping_cart_id: cart.id}, include: [{ association: 'courses'}]})
                            .then(cart_courses => {
                                if(cart_courses.length == 0){
                                    res.render('CART', {categories, loggedInUser: req.session.loggedIn, courses: cart_courses, error: true})
                                } else {
                                    res.render('CART', {categories, loggedInUser: req.session.loggedIn, courses: cart_courses, error: false});
                                };
                            });
                        } else {
                            res.render('CART', {categories, loggedInUser: req.session.loggedIn, courses: [], error: true})
                        };
                    });
            })
            .catch(err => res.json({msg: 'ESTE ERROR', err}));
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