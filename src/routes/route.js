const express = require('express');
const router = express.Router();
const allCollection = require('../controllers/all')

router.get('/findByDistrict', allCollection.findByDistrict)
router.get('/weatherLondon', allCollection.weatherLondon)
router.get('/ListOfCityTemp', allCollection.ListOfCityTemp)
router.post('/allTheMemes', allCollection.allTheMemes)
router.post('/captionImage', allCollection.captionImage)

module.exports = router;