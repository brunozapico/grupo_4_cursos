const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

router.get('/', categoriesController.list);

router.get('/:id', categoriesController.detail);

module.exports = router;