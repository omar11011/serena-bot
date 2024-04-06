const mongoose = require('mongoose')

module.exports = mongoose.model('PokemonNature', new mongoose.Schema(
    {
        id: Number,
        name: {
            type: String,
            required: true,
            unique: true,
        },
        up: String,
        low: String,
    },
    {
        timestamps: false,
        versionKey: false,
    },
))