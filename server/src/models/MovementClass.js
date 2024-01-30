const mongoose = require('mongoose')

module.exports = mongoose.model('MovementClass', new mongoose.Schema(
    {
        id: Number,
        name: String,
        keys: [String],
    },
    {
        timestamps: true,
        versionKey: false,
    },
))