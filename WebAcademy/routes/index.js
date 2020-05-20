const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.index);

router.get('/register', indexController.register);
router.post('/register', indexController.create);

module.exports = router;
