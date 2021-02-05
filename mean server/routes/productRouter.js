const express = require('express');

const productsController = require('../controllers/product.controller');

const storage = require('../helpers/storage');

const router = express.Router();

router.get('/getProduct', productsController.getproducts);

router.post('/addProduct', storage, productsController.postproduct);

router.put('/updateProduct/:id', productsController.updateProduct);

router.get('/editProduct/:id', productsController.editProduct);

router.delete('/deleteProduct/:id', productsController.deleteProduct);




module.exports = router;
