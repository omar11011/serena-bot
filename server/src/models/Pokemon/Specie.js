const mongoose = require('mongoose')

const genderSchema = new mongoose.Schema({
    _id: false,
    male: { type: Number, default: 0 },
    female: { type: Number, default: 0 },
})

module.exports = mongoose.model('PokemonSpecie', new mongoose.Schema(
    {
        id: Number,
        name: {
            type: String,
            required: true,
            unique: true,
        },
        pokedex: Number,
        gender: genderSchema,
        eggGroup: [String],
        isMythical: Boolean,
        isLegendary: Boolean,
        isUltraBeast: Boolean,
        image: String,
    },
    {
        timestamps: false,
        versionKey: false,
    },
))