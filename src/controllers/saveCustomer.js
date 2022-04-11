const anatheruserModule = require('../models/anatheruserModule')

let savedData = async (req, res) => {
    let data = req.body;
    let output = {
        status: false,
        data: "Something went wrong..."
    }
    await anatheruserModule.create(data).then((success) => {
        output = {
            status: true,
            data: "Customer Data Save Successfully! ID: " + success._id
        }
    }, (error) => {
        output = {
            status: false,
            data: "Can't save customer data!"
        }
    });
    res.send(output)
}

module.exports.savedData = savedData