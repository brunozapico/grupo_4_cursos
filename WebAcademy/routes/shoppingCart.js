const router = require('express').Router();
const shoppingCartController = require('../controllers/shoppingCartController');

router.get('/', shoppingCartController.list);
router.post('/:userId', shoppingCartController.create);

module.exports = router;