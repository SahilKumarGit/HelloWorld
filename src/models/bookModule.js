const mongoose = require('mongoose')

let bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true,
        unique: true
    },
    authorName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    tags: [String],
    isPublished: Boolean,
    price: {
        IN: String,
        EURO: String
    },
    sales: {
        type: Number,
        default: 10
    },
    summery:mongoose.Schema.Types.Mixed
}, {
    timestamps: true
})

// old
module.exports = mongoose.model('Book', bookSchema); //books