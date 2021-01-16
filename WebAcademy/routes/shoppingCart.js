const router = require('express').Router();
const guestMiddleware = require('../middlewares/guestMiddleware');
const shoppingCartController = require('../controllers/shoppingCartController');

router.get('/', guestMiddleware, shoppingCartController.list);
router.post('/', guestMiddleware,  shoppingCartController.create);
// router.get('/purchase', guestMiddleware, shoppingCartController.purchase);
router.get('/purchase', guestMiddleware, shoppingCartController.mercadopago);
router.delete('/:cartCourseId', guestMiddleware,  shoppingCartController.destroy);

module.exports = router;