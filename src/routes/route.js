const express = require("express");
const lagger = require("../logger/logger");
const formatter = require("../validator/formatter");
const helper = require("../util/helper");
const ladash = require("../loadash/loadash");


const router = express.Router();

router.get("/test-me", function (req, res) {
  console.log(lagger.Welcom());
  // ---------------------------------
  console.log(formatter.trim(" FunctionUp "))
  console.log(formatter.changeToLowerCase(" FunctionUp "))
  console.log(formatter.changeToUpperCase(" FunctionUp "))

  //-----------------------------------
  console.log(helper.printDate())
  console.log(helper.printMonth())
  console.log(helper.getBatchInfo("Uranium", 2, 3, "nodeJS Module system"))
  console.log(req.query)
  // let val = JSON.stringify(req.query)
  // console.log(val)
  res.send("ok sahil1");
});



router.post("/hello", function (req, res) {
  console.log("test-me run");
  //   console.log(req)
  console.log(ladash.chunkExample())
  console.log(ladash.tailExamole())
  console.log(ladash.unionExample())
  console.log(ladash.useOffromPairs(["horror", "The Shining"], ["drama", "Titanic"], ["thriller", "Shutter Island"], ["fantasy", "Pans Labyrinth"]))
  res.send("ok sahil1");
});


/*My arr of names*/
let nameArr = ["Aditya", "Ramesh", "Suresh", "Mahesh", "Naresh", "Sarvesh", "Jayesh", "Paresh", "Nilesh", "Yogesh"]

/*-------------------
Q1. GET /all-candidates
    Write a get api that returns a list of candidate names
--------------------*/
router.get("/all-candidates", function (req, res) {
  res.send(JSON.stringify(nameArr));
});



/*-------------------
Q2. GET /candidates?count=3
    Write a get api that returns a list of candidates with size equal to the count value recieved in the query param.
    COnsider that the count value is greater than 0 and less or equal to 10.
--------------------*/
router.get("/candidates", function (req, res) {

  let count = Number(req.query.count);
  let filter = []
  console.log(count)
  if (count !== NaN && count > 0) {

    filter = nameArr.filter((val, index) => {
      return index < count ? true : false
    })

    // console.log(count)
    console.log(typeof count)

    res.send(JSON.stringify(filter));
  } else {
    res.send("Enter a number");
  }
});

/*method 2*/

router.get("/candidates/:count", function (req, res) {

  // let count = Number(req.query.count);
  let count = Number(req.params.count);
  let filter = []
  console.log(count)
  console.log(typeof count)

  if (count !== NaN) {
    filter = nameArr.filter((val, index) => {
      return index < count ? true : false
    })

    res.send(JSON.stringify(filter));
  } else {
    res.send("Enter a valid number");
  }


});


/*
  router.get("/candidates/:count/:dd", function (req, res) {

    // let count = Number(req.query.count);
    let count = Number(req.params.count);
    let filter = []

    if (count !== NaN) {
      filter = nameArr.filter((val, index) => {
        return index < count ? true : false
      })
      console.log(count)
      console.log(typeof count)
      console.log(req.query)
      console.log(req.params)
      res.send(JSON.stringify(filter));
    } else {
      res.send("Enter a number");
    }
  });
*/

/*---------------------------------------------------------
-----------------------------------------------------------

W2 D4 Assignment

--> Branch for this assignment is assignment/get-api
-----------------------------------------------------------
---------------------------------------------------------*/

/*-----------------------------
Q1. Create an API for GET /movies that returns a list of movies. 
    Define an array of movies in your code and return the value in response.
------------------------------------*/


let Arr = ['Avatar', 'Endgame', 'Titanic', 'The Force Awakens', 'Avengers Infinity War', 'Spider-Man No Way Home']
router.get("/movies", function (req, res) {
  res.send(Arr);
})


/*-----------------------------
Q2.0.Create an API GET /movies/:indexNumber 
(For example GET /movies/1 is a valid request and it should return the movie in your array at index 1). 
You can define an array of movies again in your api


Q2.1. Handle a scenario in problem 2
 where if the index is greater than the valid maximum value a message is returned 
 that tells the user to use a valid index in an error message.
------------------------------------*/
router.get("/movies/:indexNumber", function (req, res) {
  let indexNumber = Number(req.params.indexNumber);
  if (indexNumber >= Arr.length || indexNumber < 0) {
    res.send("valid index");
  } else {
    res.send(Arr[indexNumber]);
  }

})



/*-----------------------------
Q4. Write another api called GET /films. Instead of an array of strings define an array of movie objects this time. Each movie object should have values - id, name. An example of movies array is 
    [ {
    “id”: 1,
    “name”: “The Shining”
    }, {
    “id”: 2,
    “name”: “Incendies”
    }, {
    “id”: 3,
    “name”: “Rang de Basanti”
    }, {
    “id”: 4,
    “name”: “Finding Nemo”
    }]

    Return the entire array in this api’s response
------------------------------------*/

let ArrObj = [{
  id: 1,
  name: "The Shining"
}, {
  id: 2,
  name: "Incendies"
}, {
  id: 3,
  name: "Rang de Basanti"
}, {
  id: 4,
  name: "Finding Nemo"
}]

router.get("/films", function (req, res) {

  res.send(ArrObj);
})


/*-----------------------------
Q5. Write api GET /films/:filmId where filmId is the value received in request path params. 
    Use this value to return a movie object with this id. 
    In case there is no such movie present in the array, return a suitable message in the response body. 
    Example for a request GET /films/3 should return the movie object 
    {
    “id”: 3,
    “name”: “Rang de Basanti”
    }
    Similarly for a request GET /films/9 the response can be something like - ‘No movie exists with this id’
------------------------------------*/

router.get("/films/:filmId", function (req, res) {
  let filmID = req.params.filmId;

  let find = ArrObj.find((val, ind) => {
    if (val.id == filmID) {
      return true
    } else {
      false
    }
  })
  let result = find ? find : "No movie exists with this id: " + filmID;
  // let result = "No movie exists with this id: " + filmID;
  // if (find) {
  //   result = find;
  // }
  res.send(result);
})



module.exports = router;
// adding this comment for no reason