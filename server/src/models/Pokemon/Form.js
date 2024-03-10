const mongoose = require('mongoose')

const statSchema = new mongoose.Schema({
    _id: false,
    name: String,
    key: String,
    points: Number,
})

const evolutionSchema = new mongoose.Schema({
    _id: false,
    form: String,
    type: String,
    level: Number,
    friendship: String,
    item: String,
})

const movementSchema = new mongoose.Schema({
    _id: false,
    name: String,
    level: Number,
    category: String,
    parents: [String],
})

const imageSchema = new mongoose.Schema({
    _id: false,
    front_default: String,
    front_shiny: String,
})

module.exports = mongoose.model('PokemonForm', new mongoose.Schema(
    {
        id: Number,
        name: {
            type: String,
            required: true,
            unique: true,
        },
        specie: String,
        region: String,
        types: [String],
        isInitial: Boolean,
        isMega: Boolean,
        isGiga: Boolean,
        isParadox: Boolean,
        stats: [statSchema],
        evolutions: [evolutionSchema],
        movements: [movementSchema],
        images: imageSchema,
        spawn: Boolean,
    },
    {
        timestamps: false,
        versionKey: false,
    },
))