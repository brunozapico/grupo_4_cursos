const db = require('../database/models');

module.exports = {
    create: (req, res, next) => {
        // BUSCO EL CARRITO ACTIVO DEL USUARIO
        db.ShoppingCart.findOne({where: {user_id: req.params.userId, status: 1}})
        .then(cart => {
            if(!cart) {
                // SI NO HAY CARRITO, LO CREO
                let newCart = { user_id: req.params.userId };

                db.ShoppingCart.create(newCart)
                .then(cart => res.json(cart))
                .catch(err => res.json({err, msg: 'ERROR'}));
            } else {
                // SI YA EXISTIA, LO MUESTRO
                return res.json({msg: 'YA EXISTIA', cart});
            };

        })
        .catch(err => res.json({err, msg: 'ERROR'}));
    },
};