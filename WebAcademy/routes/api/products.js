const express = require('express');
const router = express.Router();
const productsController = require('../../controllers/api/productsController');

// Listar
router.get('/', productsController.list);

// Detail
router.get('/:id', productsController.detail);

// Create
router.post('/', productsController.create);

// Update
router.patch('/:id', productsController.update);

// Delete
router.delete('/:id', productsController.delete);

module.exports = router;