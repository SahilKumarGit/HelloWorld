const express = require('express');
const logger = require('./logger')
const saveArrFn = require('../controlers/saveinarray')

const router = express.Router();

router.get('/user-profile/:abcd', function (req, res) {
    console.log(req)
    console.log(req.params.abcd)
    res.send('dummy response')
})

router.get('/test-me', function (req, res) {
    console.log('------------------')
    console.log(req)
    console.log('------------------')
    console.log('These are the request query parameters: ', req.query)
    res.send('My first ever api!')
});

/*--------------------------
find the missing number from 1 to 9
--------------------------*/
router.get("/missingNumber0to9", function (req, res) {
    // let filmID = req.params.filmId;
    // console.log('s')
    let arr = [1, 2, 3, 4, 5, 7, 8, 9]
    // lets sum pf 1 to 9 num (n) n*(n+1)/2 (first-last)*(last - first +1)/2
    let sum1To9 = ((9 + 1) * ((9 - 1) + 1)) / 2;

    // sum of the current arr
    let arrSum = (array) => {
        let sum = 0;
        array.forEach((e) => {
            sum = sum + e;
        })
        return sum
    }
    let missing = sum1To9 - arrSum(arr)
    console.log(missing)
    // missing number is ${missing}
    res.send(`missing number is: ${missing}`);
})



/*--------------------------
find the missing number from any to N
--------------------------*/
router.get("/missingNumber", function (req, res) {
    // let filmID = req.params.filmId;
    // console.log('s')
    let arr = [33, 34, 35, 36, 38, 39]
    arr.sort();
    let first = arr[0]
    let last = arr[arr.length - 1]
    // lets sum pf any to n num 
    let sum1To9 = ((first + last) * (last - first + 1)) / 2; //252

    // sum of the current arr
    let arrSum = (array) => {
        let sum = 0;
        array.forEach((e) => {
            sum = sum + e
        })
        return sum
    }

    let missing = sum1To9 - arrSum(arr)
    console.log(missing)
    // missing number is ${missing}
    res.send(`missing number is: ${missing}`);
})






// POST

router.post('/postData', function (req, res) { //#handeler
    res.send(req.body)
});

// POST

router.post('/postsend', saveArrFn.arraySave); //#handeler









module.exports = router;
// adding this comment for no reason