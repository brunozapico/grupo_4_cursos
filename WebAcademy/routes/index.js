const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const indexController = require('../controllers/indexController');
const guestMiddleware = require('../middlewares/guestMiddleware');

// MULTER Config.
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '..', 'public', 'img', 'users'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
  
  var upload = multer({ storage: storage })

router.get('/', indexController.index);

router.get('/register', indexController.register);
router.post('/register', upload.any(), indexController.create);

router.get('/login', guestMiddleware, indexController.login);
router.post('/login', indexController.processLogin);

router.get('/shoppingCart', indexController.shoppingCart);

module.exports = router;