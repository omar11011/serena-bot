const mongoose = require('mongoose')

const genderSchema = new mongoose.Schema({
    _id: false,
    male: { type: Number, default: 50 },
    female: { type: Number, default: 50 },
})

module.exports = mongoose.model('PokemonSpecie', new mongoose.Schema(
    {
        id: Number,
        name: String,
        pokedex: Number,
        keys: [String],
        gender: { type: genderSchema, default: {} },
        eggGroup: [String],
        isMythical: { type: Boolean, default: false },
        isLegendary: { type: Boolean, default: false },
        isUltraBeast: { type: Boolean, default: false },
        image: String,
    },
    {
        timestamps: true,
        versionKey: false,
    },
))