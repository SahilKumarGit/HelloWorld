const bookSchema = require('../models/bookModel')
const autherSchema = require('../models/authorModule')



/*------------------------------------------------------------
📑 -> create auther 
------------------------------------------------------------*/

let createAuthor = async (req, res) => {
    let data = req.body;
    // create new auth document
    let result = await autherSchema.create(data)
        .then((success) => {
            return {
                status: true,
                data: success
            }
        }, (err) => {
            return {
                status: false,
                data: err.message
            }
        });

    res.send(result);
}



/*------------------------------------------------------------
📑 -> create books
------------------------------------------------------------*/

let createBook = async (req, res) => {
    let data = req.body;
    let result = {
        status: false,
        message: "Something wents worng"
    }

    // check auther already exist or not
    let autherExist = await autherSchema.findOne({
        _id: data.author_id
    }).then((success) => {
        return success === null ? false : true
    }, (err) => {
        return false
    })

    if (autherExist) {
        // create new book doc
        result = await bookSchema.create(data)
            .then((success) => {
                return {
                    status: true,
                    data: success
                }
            }, (err) => {
                return {
                    status: false,
                    data: err.message
                }
            });
    } else {
        result = {
            status: false,
            message: "No auther found related your auther_id, Please enter currect one."
        }
    }




    res.send(result);
}



/*------------------------------------------------------------
📑 -> get book list 
------------------------------------------------------------*/

let allList = async (req, res) => {
    let result = {
        status: false,
        message: "Something wents worng"
    }

    // check auther already exist or not if exist then fatch the auther_id 🔎🔎
    result = await bookSchema.find().populate("author_id").then((success) => {
        return {
            status: true,
            data: success
        }
    }, (err) => {
        return {
            status: false,
            data: err.message
        }
    });
    res.send(result);
}



// export all functions...
module.exports.createAuthor = createAuthor;
module.exports.createBook = createBook;
module.exports.allList = allList;