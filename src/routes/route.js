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

  res.send("ok sahil");
});


router.get("/hello", function (req, res) {
  console.log("test-me run");
  //   console.log(req)
  console.log(ladash.chunkExample())
  console.log(ladash.tailExamole())
  console.log(ladash.unionExample())
  console.log(ladash.useOffromPairs(["horror", "The Shining"], ["drama", "Titanic"], ["thriller", "Shutter Island"], ["fantasy", "Pans Labyrinth"]))
  res.send("ok sahil1");
});

module.exports = router;
// adding this comment for no reason