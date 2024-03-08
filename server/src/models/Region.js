const mongoose = require('mongoose')

module.exports = mongoose.model('Region', new mongoose.Schema(
    {
        id: Number,
        name: {
            type: String,
            required: true,
            unique: true,
        },
        image: String,
    },
    {
        timestamps: false,
        versionKey: false,
    },
))