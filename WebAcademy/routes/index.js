const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.index);

router.get('/shoppingCart', indexController.shoppingCart);

module.exports = router;