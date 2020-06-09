const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const guestMiddleware = require('../middlewares/guestMiddleware');

router.get('/', indexController.index);

router.get('/shoppingCart', guestMiddleware,indexController.shoppingCart);

module.exports = router;