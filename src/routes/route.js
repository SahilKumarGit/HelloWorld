const express = require('express');
const bookController = require('../controllers/bookCollection')
const router = express.Router();



router.post('/createPublisher', bookController.createPublisher)
router.post('/createAuthor', bookController.createAuthor)
router.post('/createBook', bookController.createBook)
router.get('/bookList', bookController.bookList)



// error 404 handler
router.post('/**', (req, src) => {
    src.send('😒 In POST, no such a API handler...')
})
router.get('/**', (req, src) => {
    src.send('😒 In GET, no such a API handler...')
})

module.exports = router;