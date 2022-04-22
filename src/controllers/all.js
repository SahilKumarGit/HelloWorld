const userModule = require('../models/userModule')
const jwt = require('jsonwebtoken');

/*Q1. Write a POST api /users to register a user from the user details in request body.*/

const registration = async (req, res) => {
    // 😎 first we need to get post body data
    const data = req.body;
    // 😎 now we need to create a new document in our user collection
    const userCreate = await userModule.create(data).then((success) => {
        res.status(201)
        return {
            ststus: true,
            data: success
        }
    }, (error) => {
        res.status(500)
        return {
            ststus: false,
            msg: error.message
        }
    })

    res.send(userCreate)
}






/*Q2. Write a *POST api /login to login a user that takes user details - email and password from the request body. 
If the credentials don't match with any user's data return a suitable error. 
On successful login, generate a JWT token and return it in response body.*/

const login = async (req, res) => {
    // 😎 first we need to get post body data email address and passwprd
    const data = req.body;
    // 😎 check if email exist or not
    if (!data.emailId || data.emailId == "") {
        return res.status(400).send({
            ststus: false,
            msg: "email ID undefind OR it is a empty value"
        })
    }

    // 😎 check if password exist or not
    if (!data.password || data.password == "") {
        return res.status(400).send({
            ststus: false,
            msg: "password undefind OR it is a empty value"
        })
    }

    // 😎 now we check if user inputs are ok or not
    const userCheck = await userModule.findOne({
        emailId: data.emailId,
        password: data.password,
        isDeleted: false
    });
    if (!userCheck) {
        return res.status(401).send({
            ststus: false,
            msg: "Wrong email id OR password"
        })
    }


    //🔑 generate JWT here key
    const token = jwt.sign({
        user: userCheck._id.toString()
    }, 'asdfghjkl_myKey');

    return res.status(200).send({
        ststus: true,
        data: token
    })

}







/*Q3. Write a GET api /users/:userId to fetch user details. Pass the userId as path param in the url. 
Check that request must contain x-auth-token header. If absent, return a suitable error. 
If present, check that the token is valid.*/

const users = async (req, res) => {
    // 😎 first we need to get params data
    const userId = req.params.userId;

    // 🔍 find data related userId
    const userInfo = await userModule.findOne({
        _id: userId,
        isDeleted: false
    }).catch(err => null)

    // 👎 error handel if data not found or if Null
    if (!userInfo) {
        return res.status(400).send({
            ststus: false,
            msg: "User info Unavalable"
        })
    }
    res.status(200).send({
        ststus: true,
        data: userInfo
    })
}








/*Q4. Write a PUT api /users/:userId to update user details. 
Pass the userId as path param in the url and update the attributes received in the request body. 
Check that request must contain x-auth-token header. If absent, return a suitable error.*/

const userUpdate = async (req, res) => {
    // 😎 first we need to get params data
    const userId = req.params.userId;
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
        return res.status(400).send({
            ststus: false,
            msg: "Required body key and value."
        })
    }

    // 🔍 find data related userId
    const updateInfoVar = await userModule.findOneAndUpdate({
        _id: userId,
        isDeleted: false
    }, {
        $set: data
    }, {
        new: true
    }).catch(err => null)

    // 👎 error handel if data not found or if Null
    if (!updateInfoVar) {
        return res.status(400).send({
            ststus: false,
            msg: "Can't update, User info Unavalable OR the user already deleted"
        })
    }
    res.status(200).send({
        ststus: true,
        data: updateInfoVar
    })
}








/*Q5. Write a DELETE api /users/:userId that takes the userId in the path params and marks the isDeleted attribute for a user as true. 
Check that request must contain x-auth-token header. If absent, return a suitable error.*/

const userDelete = async (req, res) => {
    // 😎 first we need to get params data
    const userId = req.params.userId;
    const data = req.body;

    // 🔍 find data related userId
    const userInfo = await userModule.updateMany({
        _id: userId,
        isDeleted: false
    }, {
        $set: {
            isDeleted: true
        }
    }).catch(err => null)

    // 👎 error handel if data not found or if Null
    if (!userInfo) {
        return res.status(400).send({
            ststus: false,
            msg: "Somthing wents worng, the user not exist or already deleted"
        })
    }
    res.status(200).send({
        ststus: true,
        data: userInfo
    })
}








module.exports.registration = registration
module.exports.login = login
module.exports.users = users
module.exports.userUpdate = userUpdate
module.exports.userDelete = userDelete