const express = require('express');
const bookController = require('../controllers/all')
const router = express.Router();



router.post('/createBatch', bookController.createBatch)
router.post('/createDevloper', bookController.createDevloper)
router.get('/scholarship-developers', bookController.scholarshipDevelopers)
router.get('/developers', bookController.devlopers)


module.exports = router;