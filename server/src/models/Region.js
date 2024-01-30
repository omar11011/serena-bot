const mongoose = require('mongoose')

module.exports = mongoose.model('Region', new mongoose.Schema(
    {
        id: Number,
        name: String,
        keys: [String],
        image: String,
    },
    {
        timestamps: true,
        versionKey: false,
    },
))