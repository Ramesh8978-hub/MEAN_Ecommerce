const express = require('express');

const addressController = require('../controllers/address.controller');

const router = express.Router();

router.get('/getAddress', addressController.getAddress);

router.post('/addAddress', addressController.addAddress);

router.delete('/deleteAddress/:id', addressController.deleteAddress);

router.put('/updataAddress', addressController.updataAddress);




module.exports = router;
