const mongoose = require('mongoose')

module.exports = mongoose.model('Anime', new mongoose.Schema(
    {
        name: String,
        description: String,
        isMale: Boolean,
        isFemale: Boolean,
        isWaifu: Boolean,
        isHusbando: Boolean,
        image: String,
    },
    {
        timestamps: true,
        versionKey: false,
    },
))