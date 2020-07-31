const router = require('express').Router();
const guestMiddleware = require('../middlewares/guestMiddleware');
const shoppingCartController = require('../controllers/shoppingCartController');

router.get('/', guestMiddleware, shoppingCartController.list);
router.post('/:userId', guestMiddleware,  shoppingCartController.create);
router.delete('/:cartCourseId', guestMiddleware,  shoppingCartController.destroy);

module.exports = router;