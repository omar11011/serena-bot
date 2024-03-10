const mongoose = require('mongoose')

const effectivenessSchema = new mongoose.Schema({
    _id: false,
    high: [String],
    low: [String],
    immune: [String],
})

module.exports = mongoose.model('PokemonType', new mongoose.Schema(
    {
        id: Number,
        name: {
            type: String,
            required: true,
            unique: true,
        },
        effectiveness: effectivenessSchema,
        image: String,
    },
    {
        timestamps: false,
        versionKey: false,
    },
))