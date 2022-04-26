const axios = require('axios')


/* 1-> WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" 
    for any given district id and for any given date. 
    This is a very basic assignment and totally along the lines of what we covered in the session.
*/
const findByDistrict = async (req, res) => {
    const date = req.query.date
    const district = req.query.district

    try {
        const options = {
            method: 'get',
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district}&date=${date}`
        }
        const Result = await axios(options)

        res.status(Result.status).send({
            msg: Result.data
        });
    } catch (err) {
        console.log(err)
        res.status(500).send({
            msg: err.messgae
        });
    }
}






/* 2.a->
    Get weather of London from  http://api.openweathermap.org/data/2.5/weather?q=London&appid=<useYourOwnAppId>  
    (NOTE: must use HTTP infront of the url else axios will attempt to hit localhost and give error  ..also use HTTP only and not HTTPS)
    then change the above to get the temperature only( of London)
*/
const weatherLondon = async (req, res) => {
    try {
        const city = req.query.city || 'London'
        const options = {
            method: 'get',
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7b6d62901b5199e06e1d9f2d6c463d13`
        }
        const Result = await axios(options)

        res.status(Result.status).send({
            msg: Result.data.main.temp
        });
    } catch (err) {
        console.log(err)
        res.status(500).send({
            msg: err.messgae
        });
    }
}







/* 2.b->
    Sort the cities     [ "Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]   in order of their increasing temperature
*/
const ListOfCityTemp = async (req, res) => {
    const data = ["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"];
    let arrAy = [];

    try {
        for (let I = 0; I < data.length; I++) {
            const eachCity = data[I];
            const options = {
                method: 'get',
                url: `http://api.openweathermap.org/data/2.5/weather?q=${eachCity}&appid=7b6d62901b5199e06e1d9f2d6c463d13`
            }
            const Result = await axios(options)
            let temp = Result.data.main.temp
            arrAy.push({
                city: eachCity,
                temp: temp
            })
        }

        let tempArr = arrAy.sort((val1, val2) => val1.temp - val2.temp)

        res.status(200).send({
            msg: tempArr
        });
    } catch (err) {
        console.log(err)
        res.status(500).send({
            msg: err.messgae
        });
    }
}



/* 3.a->
    Step1: Get all the memes at Postman (https://api.imgflip.com/get_memes).
    Step 2 : Pick a memeId you want (Eg 129242436) for the POST request (from the result from  above )
*/
const allTheMemes = async (req, res) => {
    try {

        const options = {
            method: 'get',
            url: `https://api.imgflip.com/get_memes`
        }
        const Result = await axios(options)

        res.status(Result.status).send(Result.data);

    } catch (err) {
        console.log(err)
        res.status(500).send({
            msg: err.messgae
        });
    }
}



/* 3.b->
    Assignment: Create a Post request API (https://api.imgflip.com/caption_image) with only query params. 
    Following are the params
*/
const captionImage = async (req, res) => {
    try {
        const data = req.query;
        const options = {
            method: 'post',
            url: `https://api.imgflip.com/caption_image?template_id=${data.template_id}&text0=${data.text0}&text1=${data.text1}&username=${data.username}&password=${data.password}`
        }
        const Result = await axios(options)

        res.status(Result.status).send(Result.data);

    } catch (err) {
        console.log(err)
        res.status(500).send({
            msg: err.messgae
        });
    }
}












module.exports.findByDistrict = findByDistrict;
module.exports.weatherLondon = weatherLondon;
module.exports.ListOfCityTemp = ListOfCityTemp;
module.exports.allTheMemes = allTheMemes;
module.exports.captionImage = captionImage;