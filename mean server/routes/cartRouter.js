const express = require('express');

const cartController = require('../controllers/cart.controller');

const router = express.Router();

router.get('/getCartItems', cartController.getCartItems);

router.post('/addToCart', cartController.addToCart);

router.delete('/deleteCartItems/:id', cartController.deleteCartItems);

router.put('/updataCartItems', cartController.updataCartItems);



module.exports = router;
