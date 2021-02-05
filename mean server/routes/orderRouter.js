const express = require('express');

const orderController = require('../controllers/order.controller');

const router = express.Router();

router.get('/getOrderByUser', orderController.getOrderByUser);

router.post('/placeOrderByUser', orderController.placeOrderByUser);

router.get('/getOrderByProduct', orderController.getOrderByProduct);

router.post('/placeOrderByProduct', orderController.placeOrderByProduct);

router.delete('/deleteOrderByProduct/:id', orderController.deleteOrderByProduct);

router.put('/updateOrderByProduct/:id', orderController.updateOrderByProduct);





module.exports = router;
