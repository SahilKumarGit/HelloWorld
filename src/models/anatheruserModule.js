const mongoose = require('mongoose')

let saveUser = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        unique: true,
        required: true
    },
    pasword: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    age: Number,
    parents: {
        father: String,
        mother: String
    }

})

module.exports = mongoose.model('Customer', saveUser); //customers