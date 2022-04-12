const bookSchema = require('../models/bookModel')
let createBook = async (req, res) => {
    let data = req.body;
    let output = await bookSchema.create(data).then((success) => {
        return {
            status: true,
            data: success
        }
    }, (err) => {
        return {
            status: false,
            data: "Something went worng...."
        }
    });
    res.send(output)
}


let bookList = async (req, res) => {

    let output = await bookSchema.find().select({
        bookName: 1,
        authorName: 1,
        _id: 0
    }).then((success) => {
        return {
            status: true,
            data: success
        }
    }, (err) => {
        return {
            status: false,
            data: "Something went worng...."
        }
    });
    res.send(output)
}

let getBooksInYear = async (req, res) => {
    let data = req.body;

    let output = await bookSchema.find({
        year: data.year
    }).select({
        bookName: 1,
        authorName: 1,
        _id: 0
    }).then((success) => {
        return {
            status: true,
            data: success
        }
    }, (err) => {
        return {
            status: false,
            data: "Something went worng...."
        }
    });
    res.send(output)
}

let getParticularBooks = async (req, res) => {
    let data = req.body;

    let output = await bookSchema.find(data).then((success) => {
        return {
            status: true,
            data: success
        }
    }, (err) => {
        return {
            status: false,
            data: "Something went worng...."
        }
    });
    res.send(output)
}

let getXINRBooks = async (req, res) => {

    let output = await bookSchema.find({
        $or: [{
            'price.indian': 100
        }, {
            'price.indian': 200
        }, {
            'price.indian': 500
        }]
    }).then((success) => {
        return {
            status: true,
            data: success
        }
    }, (err) => {
        return {
            status: false,
            data: "Something went worng...."
        }
    });
    res.send(output)
}

let getRandomBooks = async (req, res) => {

    let output = await bookSchema.find({
        $or: [{
            stockAvailable: true
        }, {
            totalPages: {
                $gt: 500
            }
        }]
    }).then((success) => {
        return {
            status: true,
            data: success
        }
    }, (err) => {
        return {
            status: false,
            data: "Something went worng...."
        }
    });
    res.send(output)
}


module.exports.createBook = createBook;
module.exports.bookList = bookList;
module.exports.getBooksInYear = getBooksInYear;
module.exports.getParticularBooks = getParticularBooks;
module.exports.getXINRBooks = getXINRBooks;
module.exports.getRandomBooks = getRandomBooks;