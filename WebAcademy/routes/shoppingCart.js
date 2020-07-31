const router = require('express').Router();
const guestMiddleware = require('../middlewares/guestMiddleware');
const shoppingCartController = require('../controllers/shoppingCartController');

router.get('/', guestMiddleware, shoppingCartController.list);
router.post('/:userId', shoppingCartController.create);

module.exports = router;