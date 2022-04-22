const strongAuth = (req, res, next) => {
    //🔒 get the header data of x-auth-token that i already save in req['x-auth-token-decoded'] in side auth.js module.
    //eg. req['x-auth-token-decoded'] value is let {"user": "6261724e4dc98d0f1513e017","iat": 1650554974"}

    const token_decoded = req['x-auth-token-decoded'];

    //👤 get the userId from params 
    const userID = req.params.userId;

    //🔍 check the userId from the token and userId from params are match or note.
    if (userID != token_decoded.user) {
        return res.status(403).send({
            status: false,
            msg: "Access denied Because this logined user trying to modify another user's info."
        })
    }

    // 👌 execute next function(s)
    next()
}


module.exports = strongAuth;