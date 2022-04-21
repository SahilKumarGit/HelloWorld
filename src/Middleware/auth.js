const jwt = require('jsonwebtoken');

const authorize = async (req, res, next) => {
    const header = req.headers;
    let token = header['x-auth-token'];

    //🥸 here we need to check if token is exixt or not
    if (!token) {
        return res.send({
            status: false,
            msg: "Token 'x-auth-token' (header) required"
        })
    }

    // 🔒 Check the Token is valid OR not and handel error
    try {
        const decoded = await jwt.verify(token, 'asdfghjkl_myKey')
    } catch (err) {
        return res.send({
            status: false,
            msg: "Token 'x-auth-token' is invalid"
        })
    }


    // 😀 every thing is good go to next function
    next();
}


module.exports = authorize