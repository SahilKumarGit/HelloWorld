const mongoose = require('mongoose');

let authorSchema = mongoose.Schema({
    authorName: {
        type: String,
        required: true,
        unique: true
    },
    age: Number,
    address: String,
    rating: Number

});

module.exports = mongoose.model('newAuthor', authorSchema)