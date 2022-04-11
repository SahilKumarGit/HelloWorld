const Router = require('express');
const express = require('express');
const plearsPath = require('../controllers/savePlayerFn');
const saveCustomer = require('../controllers/saveCustomer');
const userModel = require('../models/userModel')
const booksController = require('../controllers/booksCont')

const router = express.Router();


/*---------------------------------------
    Assignments(Structure of the routes file would look like what is given at the bottom of the document):
    You have to write a POST apis:
    Write the api in first project directory (Routes/index.js or routes/route.js) Problem Statement 1 :
    NOTE: you must create the players array outside( on the top ) of the api( so that data is maintained across api hits )
    Your player collection should be an ARRAY of player objects. Each player object should have the
---------------------------------------*/

router.post('/addcustomer', saveCustomer.savedData) //handeler
router.get('/listuser', plearsPath.listUser) //handeler
/*----------------------------*/
router.post('/adduser', plearsPath.saveUser) //handeler
router.get('/listuser', plearsPath.listUser) //handeler

router.post('/add', async (req, res) => {
    let data = req.body
    let output = {
        status: false,
        data: "Something went wrong..."
    }

    // lets save data <--------------------
    await userModel.create(data).then((success) => {
        output = {
            status: true,
            data: "User Data Saved: " + success._id
        };
    }, (error) => {
        output = {
            status: true,
            data: "User Data Can't Saved"
        };
    })

    res.send(output)
})



router.get('/list', async (req, res) => {
    let output = {
        status: false,
        data: "Something went wrong..."
    }

    // lets list of all datas <------------------
    await userModel.find().then((success) => {
        output = {
            status: true,
            data: success
        }
    }, (error) => {
        output = {
            status: true,
            data: "User Data Can't Saved"
        };
    })

    res.send(output)
})


/*------------------------------------------------------------------------
3. On similar lines as today’s mongodb session , 
complete this assignment and submit explainer video for the same : 
Create a bookSchema with bookName, authorName, category and year . 
Create same 
2 api's for books i.e. : 
1 api to create a new book and another api to get the list of all books.
------------------------------------------------------------------------*/
router.post('/addBook', booksController.addBook)
router.get('/listBook', booksController.listBook)



module.exports = router;