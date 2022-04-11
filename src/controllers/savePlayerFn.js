const userModel = require('../models/userModel')


let saveUser = async (req, res) => {
    let data = req.body
    let output = {
        status: false,
        data: "Something went wrong..."
    }

    // lets save data <--------------------
    await userModel.create(data).then((success) => {
        output = {
            status: true,
            data: "User Data Saved: " + success._id
        };
    }, (error) => {
        output = {
            status: true,
            data: "User Data Can't Saved"
        };
    })

    res.send(output)
}


let listUser = async (req, res) => {
    let output = {
        status: false,
        data: "Something went wrong..."
    }

    // lets list of all datas <------------------
    await userModel.find().then((success) => {
        output = {
            status: true,
            data: success
        }
    }, (error) => {
        output = {
            status: true,
            data: "User Data Can't Saved"
        };
    })

    res.send(output)
}

module.exports.saveUser = saveUser
module.exports.listUser = listUser