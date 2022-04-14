const publisherSchema = require('../models/publisher')
const authorSchema = require('../models/author')
const bookSchema = require('../models/book')


/*---------------------------------------------------------------------------
1 -> Write a POST api that creates a publisher from the details in the request body
---------------------------------------------------------------------------*/

const createAuthor = async (req, res) => {
    let data = req.body;
    let output = {
        status: false,
        message: "Something went worng."
    }

    output = await authorSchema.create(data).then((success) => {
        return {
            status: true,
            message: success
        }
    }, (err) => {
        return {
            status: false,
            message: err.message
        }
    })

    //give output to client 😎
    res.send(output);
}















/*---------------------------------------------------------------------------
2 -> Write a POST api that creates an author from the details in request body
---------------------------------------------------------------------------*/

const createPublisher = async (req, res) => {
    let data = req.body;
    let output = {
        status: false,
        message: "Something went worng."
    }

    output = await publisherSchema.create(data).then((success) => {
        return {
            status: true,
            message: success
        }
    }, (err) => {
        return {
            status: false,
            message: err.message
        }
    })

    //give output to client 😎
    res.send(output);
}















/*---------------------------------------------------------------------------
3 -> Write a POST api that creates a book from the details in the request body. 
    The api takes both the author and publisher from the request body. 

    In this api, you have to write a logic that validates the following :

    1-> The authorId is present in the request body. 
        If absent send an error message that this detail is required.

    2-> If present, make sure the authorId is a valid ObjectId in the author collection. 
        If not then send an error message that the author is not present.

    3-> The publisherId is present in the request body. 
        If absent send an error message that this detail is required.

    4-> If present, make sure the publisherId is a valid ObjectId in the publisher collection. 
        If not then send an error message that the publisher is not present.

---------------------------------------------------------------------------*/

const createBook = async (req, res) => {
    let data = req.body;
    let output = {
        status: false,
        message: "Something went worng."
    }


    // check if author id exist or not
    if (!data || !data.author || data.author == "") {
        output = {
            status: false,
            message: "Author id Required."
        }
    } else {


        // check if it is a valid author id or not
        let ValidAuthorId = await authorSchema.findOne({
            _id: data.author
        }).then((success) => {
            return success == null ? false : true
        }, (err) => {
            return false
        })

        if (!ValidAuthorId) {
            output = {
                status: false,
                message: "Invalid author id, Try again with a valid author id."
            }
        } else {



            // check if publisher id exist or not
            if (!data || !data.publisher || data.publisher == "") {
                output = {
                    status: false,
                    message: "Publisher id Required."
                }
            } else {

                // check if it is a valid publisher id or not
                let ValidPublisherId = await publisherSchema.findOne({
                    _id: data.publisher
                }).then((success) => {
                    return success == null ? false : true
                }, (err) => {
                    return false
                })

                if (!ValidPublisherId) {
                    output = {
                        status: false,
                        message: "Invalid publisher id, Try again with a valid publisher id."
                    }
                } else {

                    // every thing is good let's create book.
                    output = await bookSchema.create(data).then((success) => {
                        return {
                            status: true,
                            message: success
                        }
                    }, (err) => {
                        return {
                            status: false,
                            message: err.message
                        }
                    })
                }
            }
        }
    }

    //give output to client 😎
    res.send(output);
}















/*---------------------------------------------------------------------------
4 -> Write a GET api that fetches all the books along with their author details 
    (you have to populate for this) as well the publisher details (you have to populate for this).
---------------------------------------------------------------------------*/

const bookList = async (req, res) => {
    let output = {
        status: false,
        message: "Something went worng."
    }

    output = await bookSchema.find().populate('author').populate('publisher').then((success) => {
        return {
            status: true,
            message: success
        }
    }, (err) => {
        return {
            status: false,
            message: err.message
        }
    })

    //give output to client 😎
    res.send(output);
}




module.exports.createAuthor = createAuthor
module.exports.createPublisher = createPublisher
module.exports.createBook = createBook
module.exports.bookList = bookList