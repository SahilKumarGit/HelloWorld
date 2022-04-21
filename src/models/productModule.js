const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: String,
    price: {
        type: Number,
        required: true
    }
})


module.exports = mongoose.model('newProduct',productSchema);