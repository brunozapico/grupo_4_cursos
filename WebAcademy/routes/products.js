const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const multer = require('multer');
const path = require('path');
const formValidator = require('../middlewares/productFormValidator');
const adminMiddleware = require('../middlewares/adminMiddleware');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname + '/../' + '/public/' + '/img/' + '/cursos'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })

router.get('/', productsController.list);

//CREATE
router.get('/create', adminMiddleware, productsController.create)
router.post('/create', upload.any(), formValidator, productsController.store)

//DETAIL
router.get('/detail/:id', productsController.detail);

//EDIT
router.get('/edit/:id', productsController.edit);
router.put('/edit/:id', upload.any(), formValidator, productsController.update);

//SEARCH
router.get('/search', productsController.search);

//DELETE
router.delete('/delete/:id', productsController.destroy);

module.exports = router;