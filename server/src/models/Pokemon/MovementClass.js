const mongoose = require('mongoose')

module.exports = mongoose.model('PokemonMovementClass', new mongoose.Schema(
    {
        id: Number,
        name: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: false,
        versionKey: false,
    },
))