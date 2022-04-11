const mongoose = require('mongoose')

/* ----> MODULE <---- */
/* ----> Schema <---- */
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    mobile: {
        type: String,
        unique: true,
        required: true
    },
    emailId: String,
    gender: {
        type: String,
        enum: ["male", "female", "LGBTQ"], //enum use for only 3 values in array are allowed.
    },
    age: Number,
    isIndian: Boolean,
    cars: [String]
}, {
    timestamps: true //it create field of createAt,modifiedAt
})


module.exports = mongoose.model('User', userSchema); //user