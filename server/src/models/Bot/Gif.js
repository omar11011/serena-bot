const mongoose = require('mongoose')

module.exports = mongoose.model('Gif', new mongoose.Schema(
    {
        url: String,
        category: String,
        anime: String,
    },
    {
        timestamps: true,
        versionKey: false,
    },
))