const mongoose = require('mongoose');
let objectId = mongoose.Schema.Types.ObjectId;

let bookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: objectId,
        ref: 'newAuthor',
        required: true
    },
    price: Number,
    ratings: Number,
    publisher: {
        type: objectId,
        ref: 'newPublisher',
        required: true
    }

});

module.exports = mongoose.model('newBook', bookSchema)