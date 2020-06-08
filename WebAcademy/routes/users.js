const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const usersController = require('../controllers/usersController');
const loggedMiddleware = require('../middlewares/loggedMiddleware');

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

router.get('/', usersController.users);

router.get('/register', usersController.register);
router.post('/register', upload.any(), usersController.create);

router.get('/login', loggedMiddleware, usersController.login);
router.post('/login', usersController.processLogin);

router.get('/logout', usersController.logout);

module.exports = router;
