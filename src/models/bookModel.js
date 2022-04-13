const mongoose = require('mongoose')

let bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        indian: Number,
        euro: Number
    },
    year: {
        type: Number,
        default: 2021
    },
    tags: [String],
    authorName: String,
    totalPages: Number,
    stockAvailable: {
        type: Boolean,
        default: false
    },
    isDelete: Boolean
}, {
    timestamps: true
})

module.exports = mongoose.model('mybook', bookSchema);