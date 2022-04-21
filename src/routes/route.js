const express = require('express');
const router = express.Router();
const checkHeader = require('../Middleware/headerValidation')
const allCollection = require('../controllers/all')

router.post('/createProduct', allCollection.createProduct);


router.post('/createUser', checkHeader, allCollection.createUser);


router.post('/placeOrder', checkHeader, allCollection.placeOrder);



module.exports = router;