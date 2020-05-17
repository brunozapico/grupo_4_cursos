const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.productForm);

module.exports = router;