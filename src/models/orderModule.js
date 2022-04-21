const mongoose = require('mongoose')
const objID = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema({
    userId: {
        type: objID,
        required: true
    },
    productId: {
        type: objID,
        required: true
    },
    amount: Number,
    isFreeAppUser: {
        type: Boolean,
        default: false
    },
    date: String
})


module.exports = mongoose.model('newOrders', orderSchema);