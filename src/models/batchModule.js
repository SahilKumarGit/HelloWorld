const mongoose = require('mongoose');

let batchSchema = new mongoose.Schema({
    name: String,
    size: Number,
    program: {
        type: String,
        enum: ["backend", "frontend"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Batch", batchSchema);