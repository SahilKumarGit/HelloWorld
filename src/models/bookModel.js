const mongoose = require('mongoose')

let bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    author_id: {
        type: Number,
        required: true
    },
    ratings: {
        type: Number,
        default: 0
    },
    isDelete: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('book_db', bookSchema); //bookdbs