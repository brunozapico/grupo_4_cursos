const db = require('../database/models');

module.exports = {
    create: (req, res, next) => {
        // BUSCO EL CARRITO ACTIVO DEL USUARIO
        db.ShoppingCart.findOne({where: {user_id: req.params.userId, status: 1}})
        .then(cart => {
            if(!cart) {
                // SI NO HAY CARRITO, LO CREO
                db.ShoppingCart.create({user_id: req.params.userId})
                .then(cart => {
                    db.CartCourse.create({shopping_cart_id: cart.id, course_id: req.body.course_id})
                    .then(course => res.json(course))
                    .catch(err => res.json({msg: 'ERROR', err}));
                })
                .catch(err => res.json({msg: 'ERROR', err}));
            } else {
                // SI YA EXISTIA, CREO EL CURSO EN ESE SHOPPING CART
                db.CartCourse.create({shopping_cart_id: cart.id, course_id: Number(req.body.course_id)})
                    .then(course => res.json(course))
                    .catch(err => res.json({msg: 'ERROR', err}));
            };
        })
        .catch(err => res.json({msg: 'ERROR', err}));
    },
};