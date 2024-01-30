const mongoose = require('mongoose')

const statSchema = new mongoose.Schema({
    _id: false,
    hp: { type: Number, default: 20 },
    attack: { type: Number, default: 20 },
    defense: { type: Number, default: 20 },
    spattack: { type: Number, default: 20 },
    spdefense: { type: Number, default: 20 },
    speed: { type: Number, default: 20 },
})

const movementSchema = new mongoose.Schema({
    _id: false,
    name: { type: String, required: true },
    level: { type: Number, default: 1 },
    category: String,
    parents: [String],
})

const evolutionSchema = new mongoose.Schema({
    _id: false,
    form: String,
    type: { type: String, default: "level" },
    level: { type: Number, default: 1 },
    friendship: { type: Number, default: 0 },
    item: String,
})

const imageSchema = new mongoose.Schema({
    _id: false,
    front_default: { type: String, default: null },
    front_shiny: { type: String, default: null },
})

module.exports = mongoose.model('PokemonForm', new mongoose.Schema(
    {
        id: Number,
        name: String,
        keys: [String],
        specie: String,
        description: String,
        region: { type: String, default: "kanto" },
        types: { type: [String], default: ["normal"] },
        isInitial: { type: Boolean, default: false },
        isMega: { type: Boolean, default: false },
        isGiga: { type: Boolean, default: false },
        isParadox: { type: Boolean, default: false },
        stats: { type: statSchema, default: {} },
        evolutions: { type: [evolutionSchema], default: null },
        movements: { type: [movementSchema], default: null },
        images: { type: imageSchema, default: {} },
    },
    {
        timestamps: true,
        versionKey: false,
    },
))