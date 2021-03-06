const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const usersController = require('../controllers/usersController');

const loggedMiddleware = require('../middlewares/loggedMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const registerValidator = require('../middlewares/registerValidator');
const loginValidator = require('../middlewares/loginValidator');
const editProfileValidator = require('../middlewares/editProfileValidator')

// ** MULTER **
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '..', 'public', 'img', 'users'));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
const upload = multer({ storage: storage });
// ** MULTER **

router.get('/', guestMiddleware, usersController.users);

router.get('/register', loggedMiddleware, usersController.register);
router.post('/register', upload.any(), registerValidator, usersController.create);

router.get('/login', loggedMiddleware, usersController.login);
router.post('/login', loginValidator, usersController.processLogin);

router.get('/editProfile', guestMiddleware, usersController.edit);
router.put('/editProfile', guestMiddleware, upload.any(), editProfileValidator, usersController.update);

router.post('/delete', guestMiddleware, usersController.destroy);
router.post('/logout', guestMiddleware, usersController.logout);

module.exports = router;