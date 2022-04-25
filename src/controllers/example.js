const axios = require('axios')
const run1 = async (req, res) => {
    // let pin = req.query.pin
    // let date = req.query.date
    let option = {
        method: "post",
        url: "https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP",
        data:{
            mobile:'9658852281'
        }
    }
    let result = await axios(option);
    
    res.status(200).send({
        msg: result.data,
        status: true
    })
}

module.exports.run1 = run1