const mongoose = require('mongoose');

let authorSchema = new mongoose.Schema({
    author_name: {
        type: String,
        required: true,
        unique: true
    },
    age: Number,
    address: String
}, {
    timestamps: true
});


module.exports = mongoose.model('author_db', authorSchema); //authordbs