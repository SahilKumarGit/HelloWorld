const express = require('express');
const booksController = require('../controllers/myBooksController')
const router = express.Router();


router.post('/createAuthor', booksController.createAuthor)
router.post('/createBook', booksController.createBook)
router.get('/allList', booksController.allList)





// error 404 handler
router.post('/**', (req, src) => {
    src.send('😒 In POST, no such a API handler...')
})
router.get('/**', (req, src) => {
    src.send('😒 In GET, no such a API handler...')
})

module.exports = router;