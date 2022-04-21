const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 100
    },
    address: String,
    age: Number,
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    isFreeAppUser: {
        type: Boolean,
        default: false
    }
})


module.exports = mongoose.model('newUser', usersSchema);