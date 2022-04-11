const bookSchema = require('../models/bookModule')

let addBook = async (req, res) => {
    let data = req.body
    let output = {
        status: false,
        data: "Something went worng..."
    }
    await bookSchema.create(data).then((success) => {
        output = {
            status: true,
            data: "Book Saved!"
        }
    }, (err) => {
        output = {
            status: false,
            data: "Can't Save Book information!"
        }
        console.error(err)
    });
    res.send(output)
}

let listBook = async (req, res) => {
    let output = {
        status: false,
        data: "Something went worng..."
    }
    await bookSchema.find().then((success) => {
        output = {
            status: true,
            data: success
        }
    }, (err) => {
        output = {
            status: false,
            data: "Can't fatch book list!"
        }
        console.error(err)
    });
    res.send(output)
}


module.exports.addBook = addBook
module.exports.listBook = listBook