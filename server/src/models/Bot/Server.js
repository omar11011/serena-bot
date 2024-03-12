const mongoose = require('mongoose')

const statSchema = new mongoose.Schema({
    _id: false,
    name: String,
    key: String,
    points: { type: Number, default: 5 },
})

const pokemonSchema = new mongoose.Schema({
    _id: false,
    name: String,
    specie: String,
    shiny: { type: Boolean, default: false },
    gender: { type: String, default: 'none' },
    stats: [statSchema],
})

const spawnSchema = new mongoose.Schema({
    _id: false,
    channel: String,
    pokemon: { type: pokemonSchema, default: null },
})

module.exports = mongoose.model('SerenaServer', new mongoose.Schema(
    {
        server: {
            type: String,
            required: true,
            unique: true,
        },
        spawn: [spawnSchema],
    },
    {
        timestamps: true,
        versionKey: false,
    },
))