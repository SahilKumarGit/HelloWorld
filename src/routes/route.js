const express = require('express');
const booksController = require('../controllers/myBooksController')
const router = express.Router();


/*----------------------------------------------------------------------------
Assignment :
Create a books collection in your DB ( using bookModel with following fields)- 
bookName( mandatory field), price containing Indian and european price, 
year ( should be 2021 if no year is provided) , 
tags array, authorName, totalPages , stockAvailable ( true false) 

create the following API’s (write logic in bookController and routes in routes):

    ->createBook : to create a new entry..use this api to create 11+ entries in your collection

    ->bookList : gives all the books- their bookName and authorName only 

    ->getBooksInYear: takes year as input in post request and gives list of all books published that year

    ->getParticularBooks:- (this is a good one, make sincere effort to solve this) take any input and use it as a condition to fetch books that satisfy that condition
        e.g if body had { name: “hi”} then you would fetch the books with this name
        if body had { year: 2020} then you would fetch the books in this year
        hence the condition will differ based on what you input in the request body

    ->getXINRBooks- request to return all books who have an Indian price tag of “100INR” or “200INR” or “500INR” 

    ->getRandomBooks - returns books that are available in stock or have more than 500 pages 
----------------------------------------------------------------------------*/


router.post('/createBook', booksController.createBook)
router.get('/bookList', booksController.bookList)
router.post('/getBooksInYear', booksController.getBooksInYear)
router.post('/getParticularBooks', booksController.getParticularBooks)
router.get('/getXINRBooks', booksController.getXINRBooks)
router.get('/getRandomBooks', booksController.getRandomBooks)





// error 404 handler
router.post('/**', (req, src) => {
    src.send('😒 In POST, no such a API handler...')
})
router.get('/**', (req, src) => {
    src.send('😒 In GET, no such a API handler...')
})

module.exports = router;