const mongoose = require('mongoose');

let publisherSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    headQuarter: {
        type: String
    }
});

module.exports = mongoose.model('newPublisher', publisherSchema)