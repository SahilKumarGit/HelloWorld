/*--------------------------------------------------------------------------------
- ASSIGNMENT:-
Write a middleware that logs (console.log) some data everytime any API is hit
Data to be logged:-the current timestamp(as date time) , the IP of the user and the route being requested).
For this first figure out how to get the route location being request, how to get current timestamp and how to get the IP.
NOTE: ip of local computer will come as ::1 so dont get disturbed by seeing this)

e.g: you should be logging something like this on each line:
time , IP, Route should be printed on each line in terminal( every time an api is hit)
2010-08-19 14:00:00 , 123.459.898.734 , /createUser
-------------------------------------------------------------------------------- */


const moment = require('moment'); // require



const generateLog = (req, res, next) => {

    let rawIP = req.socket.remoteAddress; // -> ::ffff:127.0.0.1
    let IP = rawIP.split(":")[3];

    let routPath = req.path

    let timeIs = moment().format("YYYY-MM-DD hh:mm:ss A");

    console.log(`${timeIs}, ${IP}, ${routPath}`)

    // console.log('->', '\x1b[1m', `${timeIs}, ${IP}, ${routPath}`, '\x1b[0m')
    next();
}

module.exports = generateLog;