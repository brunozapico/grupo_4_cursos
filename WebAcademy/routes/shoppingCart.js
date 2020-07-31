const router = require('express').Router();
const shoppingCartController = require('../controllers/shoppingCartController');

router.post('/shoppingCart/:userId', shoppingCartController.create);

module.exports = router;