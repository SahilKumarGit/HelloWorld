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
        author_id: data.author_id
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
📑 -> get book list related Chetan Bhagat
------------------------------------------------------------*/

let chetanBhagatBookList = async (req, res) => {
    let result = {
        status: false,
        message: "Something wents worng"
    }

    // check auther already exist or not if exist then fatch the auther_id 🔎🔎
    let autherExist = await autherSchema.findOne({
        author_name: "Chetan Bhagat"
    }).then((success) => {
        return success === null ? false : success.author_id;
    }, (err) => {
        return false
    })

    if (autherExist) {
        // find book related auther is 🤯🤯
        result = await bookSchema.find({
                author_id: autherExist
            })
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
📑 -> update Two states book prive value
------------------------------------------------------------*/

let updateTwoStates = async (req, res) => {
    // update data of book name Two states 's price to 100
    let result = await bookSchema.findOneAndUpdate({
            name: "Two states"
        }, {
            $set: {
                price: 100
            }
        }, {
            new: true
        })
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


// export all functions...
module.exports.createAuthor = createAuthor;
module.exports.createBook = createBook;
module.exports.chetanBhagatBookList = chetanBhagatBookList;
module.exports.updateTwoStates = updateTwoStates;