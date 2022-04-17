const publisherSchema = require('../models/publisher')
const authorSchema = require('../models/author')
const bookSchema = require('../models/book');
// const author = require('../models/author');


/*---------------------------------------------------------------------------
1 -> Write a POST api that creates an author from the details in request body
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
2 -> Write a POST api that creates a publisher from the details in the request body
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














/*---------------------------------------------------------------------------
5.1 -> Add a new boolean attribute in the book schema called isHardCover with a default false value. 
    For the books published by 'Penguin' and 'HarperCollins', update this key to true.

5.2 -> For the books written by authors having a rating greater than 3.5, 
    update the books price by 10 (For eg if old price for such a book is 50, new will be 60) 
---------------------------------------------------------------------------*/
const bookupdate1 = async (req, res) => {


    // 5.1 -------------------------------------------------------------


    // get Penguin s ID
    let PenguinID = await publisherSchema.findOne({
        name: 'Penguin'
    }).then((success) => {
        return success !== null ? success._id : null;
    }, (err) => {
        return null
    })

    //get HarperCollins ID
    let HarperCollinsID = await publisherSchema.findOne({
        name: 'HarperCollins'
    }).then((success) => {
        return success !== null ? success._id : null;
    }, (err) => {
        return null
    })

    // update book isHardCover data
    let update1 = await bookSchema.updateMany({
        publisher: {
            $in: [PenguinID, HarperCollinsID]
        }
    }, {
        $set: {
            isHardCover: true
        }
    }).then((success) => {
        return success
    }, (err) => {
        return err.message
    })

    //give output to client 😎
    res.send({
        status: true,
        message: update1
    });
}


const bookupdate2 = async (req, res) => {
    // get auther list which rating >= 3.5
    let authArr = await authorSchema.find({
        rating: {
            $gte: 3.5
        }
    })

    let idsArr = [];
    authArr.forEach((each) => {
        idsArr.push(each._id)
    })

    // find books related rattings
    let bookData = await bookSchema.updateMany({
        author: {
            $in: idsArr
        }
    }, {
        $inc: {
            price: +10
        }
    })
    //give output to client 😎
    res.send({
        status: true,
        message: bookData
    });
}









module.exports.createAuthor = createAuthor
module.exports.createPublisher = createPublisher
module.exports.createBook = createBook
module.exports.bookList = bookList
module.exports.bookupdate1 = bookupdate1
module.exports.bookupdate2 = bookupdate2