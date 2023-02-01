const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controllers');

router.route('/bulk-update')
    .patch(productController.bulkUpdateProduct)

router.route('/')
    .get(productController.getProduct)
    .post(productController.createProduct)

router.route('/:id')
    .patch(productController.updateProduct)
    .delete(productController.deleteProductById)


module.exports = router;