const jwt = require('jsonwebtoken');

const authorize = async (req, res, next) => {
    const header = req.headers;
    let token = header['x-auth-token'];

    //🥸 here we need to check if token is exixt or not
    if (!token) {
        return res.status(401).send({
            status: false,
            msg: "Token 'x-auth-token' (header) required"
        })
    }

    // 🔒 Check the Token is valid OR not and handel error
    try {
        const decoded = await jwt.verify(token, 'asdfghjkl_myKey')
        req['x-auth-token-decoded'] = decoded; //save decoded data to req['x-auth-token']
    } catch (err) {
        return res.status(500).send({
            status: false,
            msg: `Error: ${err.message}`
        })
    }


    // 😀 every thing is good go to next function
    next();
}


module.exports = authorize