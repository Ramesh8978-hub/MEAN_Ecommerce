const express = require('express');

const paymentsController = require('../controllers/paymentsController');

const router = express.Router();

router.get('/getPayment', paymentsController.getPayment);

router.post('/addPayment', paymentsController.addPayment);

router.delete('/deletePayment/:id', paymentsController.deletePayment);

router.put('/updataPayment/:id', paymentsController.updataPayment);




module.exports = router;
