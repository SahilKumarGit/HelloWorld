const express = require('express');
const logger = require('../logger/logger')
const helper = require('../util/helper')
const formater = require('../validator/formatter')
const loadash = require('../loadash/loadash')

const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log(logger.welcom())
    // ---------------------------------
    console.log(helper.printDate())
    console.log(helper.printMonth())
    console.log(helper.getBatchInfo("Uranium", 2, 3, "Nodejs module system"))

    // ------------------------------------
    console.log(formater.trim(" FubctionUp "))
    console.log(formater.changetoLowerCase("FubctionUp"))
    console.log(formater.changetoUpperCase("FubctionUp"))

    res.send('My first ever api!')
});

router.get('/hello', (req, res) => {
    console.log(loadash.useOfChunk())
    console.log(loadash.useOftail())
    console.log(loadash.useOfUnion())
    console.log(loadash.useOffromPairs(["horror", "The Shining"], ["drama", "Titanic"], ["thriller", "Shutter Island"], ["fantasy", "Pans Labyrinth"]))
    res.send("Hello")
})


module.exports = router;
// adding this comment for no reason